const db = require('../models')
const Restaurant = db.Restaurant
const adminController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ raw: true })
      .then(restaurants => res.render('admin/restaurants', { restaurants }))
  },
  createRestaurant: (req, res) => res.render('admin/create'),
  postRestaurant: (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    if (!req.body) {
      req.flash('error_messages', '請填寫所有欄位。')
      return res.redirect('back')
    }
    return Restaurant.create({ name, tel, address, opening_hours, description })
      .then(() => {
        req.flash('success_messages', '餐廳新增成功。')
        res.redirect('/admin/restaurants')
      })
  }
}

module.exports = adminController