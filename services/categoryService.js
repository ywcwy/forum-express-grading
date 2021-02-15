const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const categoryService = {
  getCategories: (req, res, callback) => {
    Category.findAll({ raw: true, nest: true })
      .then(categories => {
        if (req.params.id) {
          Category.findByPk(req.params.id)
            .then(category => { return res.render('admin/categories', { categories, category }) })
        }
        return callback({ categories })
      })
  }
}

module.exports = categoryService