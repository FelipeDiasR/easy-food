const express = require("express");
const controller = require("./restaurant.controller");
const authenticate = require("../auth/auth.middleware"); 

const router = express.Router();

router.get("/", controller.list);
router.post("/", authenticate, controller.create); 

module.exports = router;