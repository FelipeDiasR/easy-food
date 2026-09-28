const prisma = require("../../database/prisma");

async function log(action, details) {
  return prisma.activity.create({
    data: { action, details }
  });
}

module.exports = { log };