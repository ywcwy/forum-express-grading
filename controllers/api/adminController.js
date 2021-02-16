const db = require('../../models')
const adminService = require('../../services/adminService')
const Restaurant = db.Restaurant
const Category = db.Category
const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => res.json(data))
  },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => res.json(data))
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => res.json(data))
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => res.json(data))
  },
}
module.exports = adminController