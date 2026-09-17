const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// GET — Listar restaurantes
app.get("/restaurants", async (req, res) => {
  try {
    const restaurantes = await prisma.restaurant.findMany();
    res.json(restaurantes);
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// POST — Cadastrar restaurante
app.post("/restaurants", async (req, res) => {
  const { name, category, rating } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
  }

  try {
    const novoRestaurante = await prisma.restaurant.create({
      data: { name, category, rating: rating || 0 }
    });

    res.status(201).json(novoRestaurante);
  } catch (error) {
    console.error("Erro ao cadastrar restaurante:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(3000, () => {
  console.log("EasyFood rodando na porta 3000");
});