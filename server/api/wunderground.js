const router = require('express').Router()
module.exports = router
const axios = require('axios')
const apiKey = process.env.WUNDER_API || require('../../secrets')

router.get('/', (req, res, next) => {
  axios.get(`http://api.wunderground.com/api/${apiKey}/geolookup/conditions/q/HI/Honolulu.json`)
    .then(response => {
      res.json(response.data)
    })
    .catch(next)
})

