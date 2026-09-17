const prisma = require("../../database/prisma");

async function  listRestaurants(data) {
    return prisma.restaurant.findMany();
}

async function createRestaurant(data) {
    return prisma.restaurant.create({
        data: {
         name: data.name,
         category: data.category,
         rating: data.rating || 0    
        }
    });
    
}

module.exports = {
    listRestaurants,
    createRestaurant
};