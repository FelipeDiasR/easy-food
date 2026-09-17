const express = require("express");
const cors = require("cors");
const path = require("path");

const restaurantRoutes = require("./modules/restaurant/restaurant.routes");
const authRoutes = require("./modules/auth/auth.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));


app.use("/auth", authRoutes); 
app.use("/restaurants", restaurantRoutes);
    


module.exports = app;