const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../../database/prisma");

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastro: guarda o usuário com a senha em hash
async function register({ name, email, password }) {
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hash }
  });

  // Nunca devolvemos a senha
  return { id: user.id, name: user.name, email: user.email };
}

// Login: confere o e-mail, compara a senha e gera o token
async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null; // usuário não existe
  }

  const senhaConfere = await bcrypt.compare(password, user.password);

  if (!senhaConfere) {
    return null; // senha errada
  }

  // Gera o token com o id e email do usuário, válido por 1 dia
  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

module.exports = { register, login };