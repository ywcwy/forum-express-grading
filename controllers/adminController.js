const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const imgur = require('imgur-node-api')
const userController = require('./userController')
const IMGUR_CLIENT_ID = '439379e8b7ad59e'
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
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({ name, tel, address, opening_hours, description, image: file ? img.data.link : null })
          .then(() => {
            req.flash('success_messages', '餐廳新增成功。')
            return res.redirect('/admin/restaurants')
          })
      })
    } else {
      return Restaurant.create({ name, tel, address, opening_hours, description, image: null })
        .then(() => {
          req.flash('success_messages', '餐廳新增成功。')
          return res.redirect('/admin/restaurants')
        })
    }
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
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then(restaurant => {
            restaurant.update({ name, tel, address, opening_hours, description, image: file ? img.data.link : restaurant.image })
              .then(() => {
                req.flash('success_messages', '餐廳更新成功。')
                res.redirect('/admin/restaurants')
              })
          })
      })
    } else {
      return Restaurant.findByPk(req.params.id)
        .then(restaurant => {
          restaurant.update({ name, tel, address, opening_hours, description, image: restaurant.image })
            .then(() => {
              req.flash('success_messages', '餐廳更新成功。')
              res.redirect('/admin/restaurants')
            })
        })
    }
  },
  deleteRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.destroy()
          .then(() => res.redirect('/admin/restaurants'))
      })
  },
  getUsers: (req, res) => {
    User.findAll({ raw: true })
      .then(users => {
        if (users.isAdmin) { users.isAdmin = true }
        else { users.isAdmin = false }
        return res.render('admin/users', { users })
      })
  },
  toggleAdmin: (req, res) => {
    User.findByPk(req.params.id)
      .then(user => user.update({ isAdmin: !user.isAdmin }))
      .then(() => res.redirect('/admin/users'))
  }
}

module.exports = adminController
