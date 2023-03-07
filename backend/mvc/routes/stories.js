const express = require('express')
const routes = express.Router()

const upload = require('../middleware/upload')
const storySave = require('../controllers/stories/stories')

routes.post('/newStorySave', upload.array('photos',4),storySave.createStory)

routes.get('/getAllStories', storySave.getAllStory)

module.exports = routes