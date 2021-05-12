/**
 * 文章路由
 */
const express = require('express')
const articleRouter = express()

articleRouter.get('/', (req, res) => {
    res.send('article')
})

module.exports = articleRouter