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
    if (!name) {
      req.flash('error_messages', '請填寫餐廳名稱。')
      return res.redirect('back')
    }
    return Restaurant.create({ name, tel, address, opening_hours, description })
      .then(() => {
        req.flash('success_messages', '餐廳新增成功。')
        res.redirect('/admin/restaurants')
      })
  },
  getRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => res.render('admin/restaurant', { restaurant }))
  },
  editRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => res.render('admin/create', { restaurant }))
  },
  putRestaurant: (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    if (!name) {
      req.flash('error_messages', '請填寫餐廳名稱。')
      return res.redirect('back')
    }
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.update({ name, tel, address, opening_hours, description })
        req.flash('success_messages', '餐廳新增成功。')
        res.redirect('/admin/restaurants')
      })
  },
}

module.exports = adminController
