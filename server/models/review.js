const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  title:  { type: String, default: '' },
  text:  { type: String, default: '' },
  rating: { type: Number, default: 1 },
  dateAdded: { type: Date, default: Date.now },
  userName:  { type: String, default: '' },
  score: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
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