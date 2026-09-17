const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  // Espera o formato: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica a assinatura e a validade do token
    const payload = jwt.verify(token, JWT_SECRET);

    // Anexa os dados do usuário na requisição
    req.user = { id: payload.sub, email: payload.email };

    next(); // token válido → segue para a rota
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

module.exports = authenticate;