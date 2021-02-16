const db = require('../models')
const categoryService = require('../services/categoryService')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => res.render('admin/categories', data))
  },
  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      if (data.status === 'error') {
        req.flash('error_messages', data.message)
        return res.redirect('back')
      }
      return res.redirect('/admin/categories')
    })
  },
  putCategory: (req, res) => {
    const { name } = req.body
    if (!name) {
      req.flash('error_messages', '請輸入分類名稱')
      return res.redirect('back')
    }
    return Category.findByPk(req.params.id)
      .then(category =>
        category.update({ name })
          .then(() => res.redirect('/admin/categories')))
  },
  deleteCategory: (req, res) => {
    Category.findByPk(req.params.id)
      .then(category => {
        category.destroy()
          .then(() => res.redirect('/admin/categories'))
      })
  }
}

module.exports = categoryController