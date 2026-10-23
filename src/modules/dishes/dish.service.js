const prisma = require("../../database/prisma");

// Helper para criar erros com status HTTP que o controller já sabe tratar
function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createDish(restaurantId, data) {
  const id = Number(restaurantId);

  if (!id) {
    throw httpError(400, "restaurantId inválido");
  }

  // Garante que o restaurante existe antes de criar o prato
  const restaurant = await prisma.restaurant.findUnique({ where: { id } });

  if (!restaurant) {
    throw httpError(404, "Restaurante não encontrado");
  }

  const { name, category, price, imageUrl, description } = data;

  if (!name || !category || price === undefined || !imageUrl || !description) {
    throw httpError(400, "Campos obrigatórios: name, category, price, imageUrl, description");
  }

  return prisma.dish.create({
    data: {
      name,
      category,
      price,
      imageUrl,
      description,
      restaurantId: id
    }
  });
}

async function listDishes(restaurantId) {
  const id = Number(restaurantId);

  if (!id) {
    throw httpError(400, "restaurantId inválido");
  }

  return prisma.dish.findMany({ where: { restaurantId: id } });
}

async function getDish(dishId) {
  const id = Number(dishId);

  if (!id) {
    throw httpError(400, "dishId inválido");
  }

  const dish = await prisma.dish.findUnique({ where: { id } });

  if (!dish) {
    throw httpError(404, "Prato não encontrado");
  }

  return dish;
}

async function updateDish(dishId, data) {
  const id = Number(dishId);

  if (!id) {
    throw httpError(400, "dishId inválido");
  }

  const dish = await prisma.dish.findUnique({ where: { id } });

  if (!dish) {
    throw httpError(404, "Prato não encontrado");
  }

  const { name, category, price, imageUrl, description } = data;

  return prisma.dish.update({
    where: { id },
    data: {
      name,
      category,
      price,
      imageUrl,
      description
    }
  });
}

async function deleteDish(dishId) {
  const id = Number(dishId);

  if (!id) {
    throw httpError(400, "dishId inválido");
  }

  const dish = await prisma.dish.findUnique({ where: { id } });

  if (!dish) {
    throw httpError(404, "Prato não encontrado");
  }

  return prisma.dish.delete({ where: { id } });
}

module.exports = {
  createDish,
  listDishes,
  getDish,
  updateDish,
  deleteDish
};
