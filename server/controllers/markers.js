const markerRouter = require('express').Router()
const Marker = require('../models/marker')

markerRouter.get('/', async (req, res) => {
  try {
    const markers = await Marker.find();
    res.status(200).send(markers);
  } catch (error) {
    res.status(500).send(error);
  }
})

markerRouter.post('/', async (req, res) => {
  try {
    const newMarker = {
      ...req.body,
      dateAdded: Date.now(),
      score: 0,
      reviewCount: 0
    }
    const marker = new Marker(newMarker);
    await marker.save();
    res.status(201).send(marker);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
})

module.exports = markerRouter