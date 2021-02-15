const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({ raw: true, nest: true, include: [Category] })
      .then(restaurants => callback({ restaurants }))
  },
  getRestaurant: (req, res, callback) => {
    Restaurant.findByPk(req.params.id, { include: [Category] })
      .then(restaurant => callback({ restaurant: restaurant.toJSON() }))
  },
}

module.exports = adminService
