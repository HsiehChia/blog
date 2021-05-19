/**
 * 类目子路由
 */
 const express = require('express')
 const dataRouter = express()
 
 const Category = require('../../middleware/cateMid')
 const User = require('../../middleware/userMid')
 const Article = require ('../../middleware/articleMid')

 dataRouter.get('/', [
     User.getUser,
     Article.getArticle,
     Category.getCategory
 ], (req, res) => {
     let {
        userList,
        articleList,
        categoryList
     } = req
     res.send({
        userList: userList,
        articleList: articleList,
        categoryList: categoryList
     })
 })

 module.exports = dataRouter