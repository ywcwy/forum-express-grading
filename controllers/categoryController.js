const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    Category.findAll({ raw: true, nest: true })
      .then(categories => res.render('admin/categories', { categories }))
  },
  postCategory: (req, res) => {
    const { name } = req.body
    if (!name) {
      req.flash('error_messages', '請新增分類名稱')
      return res.redirect('back')
    }
    return Category.create({ name })
      .then(() => res.redirect('/admin/categories'))
  }
}

module.exports = categoryController