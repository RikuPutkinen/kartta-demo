const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  description: String,
  imageUrl: String,
  dateAdded: Date,
  score: Number,
  reviewCount: Number,
});

markerSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v

    return ret
  }
})

const Marker = mongoose.model('Marker', markerSchema);
module.exports = Marker;
