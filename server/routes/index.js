const router = require('express').Router()
const {convertToJSON, convertToXML, convertToText} = require('../userDataProcessors')


router.post('/data', (req, res) => {
  let userData = req.body
  if (!userData) {
    res.status(400).send('You must send user data to process')
    return
  }
  try {
    if (req.accepts('json')) {
      userData = convertToJSON(userData)
    } else if (req.accepts('xml')) {
      userData = convertToXML(userData)
    } else if (req.accepts('text')) {
      userData = convertToText(userData)
    } else {
      res.status(406).send('Accepted formats: json, xml, text/plain')
      return
    }
  } catch (error) {
    res.status(400).send('Could not process JSON')
    return
  }
  res.send(userData)
})

module.exports = router
