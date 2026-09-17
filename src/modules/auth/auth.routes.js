const express = require("express");
const controller = require("./auth.controller");
const authenticate = require("./auth.middleware");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

// Rota protegida de exemplo: só responde com um token válido
router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Você está autenticado!", user: req.user });
});

module.exports = router;