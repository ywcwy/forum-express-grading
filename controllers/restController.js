const db = require('../models')
const categoryController = require('./categoryController')
const Restaurant = db.Restaurant
const Category = db.Category
const restControllers = {
  getRestaurants: (req, res) => {
    const whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
    }
    Restaurant.findAll({ include: Category, where: whereQuery })
      .then(restaurants => {
        const data = restaurants.map(r =>
        ({
          ...r.dataValues,
          description: r.dataValues.description.substring(0, 50),
          categoryName: r.Category.name
        })
        )
        Category.findAll({ raw: true, nest: true })
          .then(categories => res.render('restaurants', { restaurants: data, categories, categoryId }))
      })
  },
  getRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id, { include: Category })
      .then(restaurant => res.render('restaurant', { restaurant: restaurant.toJSON() }))
  }
}

module.exports = restControllers