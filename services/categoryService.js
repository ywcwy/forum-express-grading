const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const categoryService = {
  getCategories: (req, res, callback) => {
    Category.findAll({ raw: true, nest: true })
      .then(categories => {
        if (req.params.id) {
          Category.findByPk(req.params.id)
            .then(category => {
              return callback({ categories, category })
              // return res.render('admin/categories', { categories, category })
            })
        }
        return callback({ categories })
      })
  },
  postCategory: (req, res, callback) => {
    const { name } = req.body
    if (!name) { return callback({ status: 'error', message: '請新增分類名稱' }) }
    return Category.create({ name })
      .then(() => callback({ status: 'success', message: '' }))
  },
  putCategory: (req, res, callback) => {
    const { name } = req.body
    if (!name) { return callback({ status: 'error', message: '請新增分類名稱' }) }
    return Category.findByPk(req.params.id)
      .then(category =>
        category.update({ name })
          .then(() => callback({ status: 'success', message: '分類名稱已更新' }))
      )
  },
  deleteCategory: (req, res, callback) => {
    Category.findByPk(req.params.id)
      .then(category => {
        category.destroy()
          .then(() => callback({ status: 'success', message: '' }))
      })
  }
}

module.exports = categoryService