import axios from 'axios'

const baseUrl = 'https://tie.digitraffic.fi/api/weathercam/v1/stations'

const headers = {
  'Digitraffic-User': 'Kartta-demo',
}

async function getAll() {
  const res = await axios.get(baseUrl, { headers })
  return res.data
}

async function getOne(id) {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export default { getAll, getOne }
