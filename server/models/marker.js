const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  name:  { type: String, default: '' },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  dateAdded: { type: Date, default: Date.now },
  rating: { type: Number, default: 1 },
  reviewCount: { type: Number, default: 0 },
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
