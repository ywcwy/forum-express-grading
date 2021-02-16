const db = require('../models')
const categoryService = require('./categoryService')
const Restaurant = db.Restaurant
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({ raw: true, nest: true, include: [Category] })
      .then(restaurants => callback({ restaurants }))
  },
  getRestaurant: (req, res, callback) => {
    Restaurant.findByPk(req.params.id, { include: [Category] })
      .then(restaurant => callback({ restaurant: restaurant.toJSON() }))
  },
  deleteRestaurant: (req, res, callback) => {
    Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.destroy()
          .then(() => callback({ status: 'success', message: '' }))
      })
  },
  postRestaurant: (req, res, callback) => {
    const { name, tel, address, opening_hours, description } = req.body
    const { file } = req
    if (!name) { callback({ status: 'error', message: '請填寫餐廳名稱。' }) }
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({ name, tel, address, opening_hours, description, image: file ? img.data.link : null, CategoryId: req.body.categoryId })
          .then(() => callback({ status: 'success', message: '餐廳新增成功。' }))
      })
    } else {
      return Restaurant.create({ name, tel, address, opening_hours, description, image: null, CategoryId: req.body.categoryId })
        .then(() => callback({ status: 'success', message: '餐廳新增成功。' }))
    }
  },
  putRestaurant: (req, res, callback) => {
    const { name, tel, address, opening_hours, description } = req.body
    const { file } = req
    if (!name) { callback({ status: 'error', message: '請填寫餐廳名稱。' }) }
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then(restaurant => {
            restaurant.update({ name, tel, address, opening_hours, description, image: file ? img.data.link : restaurant.image, CategoryId: req.body.categoryId })
              .then(() => callback({ status: 'success', message: '餐廳更新成功。' }))
          })
      })
    } else {
      return Restaurant.findByPk(req.params.id)
        .then(restaurant => {
          restaurant.update({ name, tel, address, opening_hours, description, image: restaurant.image, CategoryId: req.body.categoryId })
            .then(() => callback({ status: 'success', message: '餐廳更新成功。' }))
        })
    }
  }
}


module.exports = adminService
