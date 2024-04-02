const reviewRouter = require('express').Router()
const Review = require('../models/review')
const Marker = require('../models/marker')

reviewRouter.get('/marker/:markerId', async (req, res) => {
  try {
    const reviews = await Review.find({ markerId: req.params.markerId })
    res.json(reviews)
  } catch (e) {
    res.status(500).send(e)
  }
})

reviewRouter.post('/marker/:markerId', async (req, res) => {
  try {
    const markerId = req.params.markerId
    const newReview = req.body

    const review = new Review({
      ...newReview,
      markerId
    })
    await review.save()

    const marker = await Marker.findById(markerId)
    const reviews = await Review.find({ markerId })
    const reviewCount = reviews.length
    const reviewScore = reviews.reduce((a, c) => a + c.rating, 0) / reviewCount

    marker.rating = reviewScore
    marker.reviewCount = reviewCount
    await marker.save()

    res.json(review)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

reviewRouter.put('/:id', async (req, res) => {
  try {
    const review = req.body
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, review, { new: true })
    res.json(updatedReview)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = reviewRouter