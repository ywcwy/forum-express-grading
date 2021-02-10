const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = '439379e8b7ad59e'
const userController = {
  signUpPage: (req, res) => { return res.render('signup') },
  signUp: (req, res) => { // 處理註冊「行為」
    if (req.body.passwordCheck !== req.body.password) {
      req.flash('error_messages', '兩次密碼輸入不同！')
      return res.redirect('/signup')
    } else {
      User.findOne({ where: { email: req.body.email } })
        .then(user => {
          if (user) {
            req.flash('error_messages', '信箱重複！')
            return res.redirect('/signup')
          } else {
            User.create({
              name: req.body.name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
            }).then(user => {
              req.flash('success_messages', '成功註冊帳號！')
              return res.redirect('/signin')
            })
          }
        })
    }
  },
  signInPage: (req, res) => { return res.render('signin') },
  signIn: (req, res) => {
    req.flash('success_messages', '登入成功！')
    res.redirect('/restaurants')
  },
  logOut: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res) => {
    User.findByPk(req.params.id)
      .then(user => res.render('user', {
        users: user.toJSON()
      }))
  },
  editUser: (req, res) => {
    User.findByPk(req.params.id)
      .then(user => res.render('userEdit', { users: user.toJSON() }))
  },
  putUser: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', '請填寫使用者名稱')
      return res.redirect('back')
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return User.findByPk(req.params.id)
          .then(user => {
            user.update({ name: req.body.name, image: file ? img.data.link : user.image })
              .then(() => {
                req.flash('success_messages', '使用者資料更新成功。')
                res.redirect(`/users/${req.params.id}`)
              })
          })
      })
    } else {
      User.findByPk(req.params.id)
        .then(user => {
          user.update({ name: req.body.name, image: user.image })
            .then(() => {
              req.flash('success_messages', '使用者資料更新成功。')
              res.redirect(`/users/${req.params.id}`)
            })
        })
    }
  }
}

module.exports = userController