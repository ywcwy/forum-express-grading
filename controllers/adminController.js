const fs = require('fs')
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
    const { file } = req
    if (file) {
      fs.readFile(file.path, (err, data) => {
        if (err) console.log('Error: ', err)
        fs.writeFile(`upload/${file.originalname}`, data, () => {
          return Restaurant.create({ name, tel, address, opening_hours, description, image: file ? `/upload/${file.originalname}` : null })
            .then(() => {
              req.flash('success_messages', '餐廳新增成功。')
              return res.redirect('/admin/restaurants')
            })
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
      fs.readFile(file.path, (err, data) => {
        if (err) console.log('Error: ', err)
        fs.writeFile(`upload/${file.originalname}`, data, () => {
          return Restaurant.findByPk(req.params.id)
            .then((restaurant) => {
              restaurant.update({ name, tel, address, opening_hours, description, image: file ? `/upload/${file.originalname}` : restaurant.image })
                .then(() => {
                  req.flash('success_messages', '餐廳更新成功。')
                  res.redirect('/admin/restaurants')
                })
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
  }
}

module.exports = adminController
