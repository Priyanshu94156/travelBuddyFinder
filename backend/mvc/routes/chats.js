const express = require('express')
const routes = express.Router()

const chats = require('../controllers/chats/chatsController')

routes.post('/pushMessage',chats.pushChats)

routes.post('/getChats',chats.getChats)

routes.post('/getUserChats',chats.getUserChats)

module.exports = routes