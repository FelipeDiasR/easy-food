const prisma = require("../../database/prisma");
const emailService = require("../shared/email.service");
const activityService = require("../shared/activity.service");

// Para quem o comercial recebe os avisos (no futuro, virá do .env ou do banco)
const COMERCIAL_EMAIL = "felipe.oliveira@pro.fecaf.com.br";

async function listRestaurants() {
  return prisma.restaurant.findMany();
}

async function createRestaurant(data, user) {
  // 1) O que realmente importa: cadastrar o restaurante
  const restaurant = await prisma.restaurant.create({
    data: {
      name: data.name,
      category: data.category,
      rating: data.rating || 0,
      ownerId: user.id // ⬅️ grava o dono (quem está logado, vindo do token)
    }
  });

  // 2) Ações secundárias — cada uma isolada por try/catch.
  //    Se qualquer uma falhar, o cadastro NÃO é afetado.

  // E-mail de boas-vindas (usa o serviço genérico)
  try {
    await emailService.sendEmail({
      to: user.email, // e-mail de quem cadastrou (vindo do token)
      toName: restaurant.name,
      subject: `Bem-vindo à EasyFood, ${restaurant.name}!`,
      header: `Olá, ${restaurant.name}!`,
      body: `Seu restaurante <strong>${restaurant.name}</strong> foi cadastrado com sucesso na EasyFood. Categoria: ${restaurant.category}.`,
      footer: "Equipe EasyFood"
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail de boas-vindas:", error.message);
  }

  // Registro da atividade
  try {
    await activityService.log("RESTAURANT_CREATED", `Restaurante: ${restaurant.name}`);
  } catch (error) {
    console.error("Erro ao registrar atividade:", error.message);
  }

  // Alerta para o comercial (MESMA função genérica, outro conteúdo)
  try {
    await emailService.sendEmail({
      to: COMERCIAL_EMAIL,
      toName: "Comercial EasyFood",
      subject: `Novo restaurante cadastrado: ${restaurant.name}`,
      header: "Novo restaurante na plataforma",
      body: `Nome: ${restaurant.name}<br/>Categoria: ${restaurant.category}<br/>Avaliação: ${restaurant.rating}`,
      footer: "Notificação automática — EasyFood"
    });
  } catch (error) {
    console.error("Erro ao notificar o comercial:", error.message);
  }

  // 3) O restaurante volta independente do resultado das ações acima
  return restaurant;

  // --- Envio de sms função 
}


// --------createrestaurant.event

module.exports = {
  listRestaurants,
  createRestaurant
};