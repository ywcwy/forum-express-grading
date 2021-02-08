const db = require('../models')
const Comment = db.Comment
const commentController = {
  postComment: (req, res) => {
    console.log(req.body)
    Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId, // 因為 form 內有設計 hidden 欄位存放 restaurantId
      UserId: req.user.id
    })
      .then(() => res.redirect(`/restaurants/${req.body.restaurantId}`))
  }
}
module.exports = commentController