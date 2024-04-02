import axios from 'axios'

const baseUrl = 'http://localhost:3001/reviews'

export async function getReviews(locationId) {
  const res = await axios.get(`${baseUrl}/marker/${locationId}`)
  return res.data
}

export async function createReview(locationId, data) {
  const res = await axios.post(`${baseUrl}/marker/${locationId}`, data)
  return res.data
}
