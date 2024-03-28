const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  title: String,
  text: String,
  rating: Number,
  dateAdded: Date,
  name: String,
  score: Number,
  likes: Number,
  dislikes: Number,
  markerId: mongoose.Schema.Types.ObjectId
})

reviewSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v

    return ret
  }
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review