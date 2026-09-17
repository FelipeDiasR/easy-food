require("dotenv").config();

const app = require("./src/app");

app.listen(3000, () => {
  console.log("EasyFood rodando na porta 3000");
});