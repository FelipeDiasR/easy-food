const restaurantService = require("./restaurant.service");

async function  list(req, res) {
    try {
    const restaurantes = await restaurantService.listRestaurants();
    res.json(restaurantes);
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
    
}


async function create(req,res) {
    const { name, category, rating } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
  }

  try {
    const restaurant = await restaurantService.createRestaurant({
      name,
      category,
      rating: rating || 0
    });

    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Erro ao cadastrar restaurante:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
    
}

module.exports = {list, create};