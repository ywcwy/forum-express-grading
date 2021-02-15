const db = require('../../models')
const categoryService = require('../../services/categoryService')
const Restaurant = db.Restaurant
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => res.json(data))
  },
}
module.exports = categoryController