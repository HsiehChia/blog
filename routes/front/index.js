/**
 * 首页路由
 */
 const express = require('express')
 var indexRouter = express.Router();

//  const User = require('../../middleware/userMid')
 const Article = require('../../middleware/articleMid')
 const Category = require('../../middleware/cateMid')

 //加载首页页面
 indexRouter.get('/', [
    //  User.getUser, 
     Article.getArticle,
     Category.getCategory
    ], (req, res) => {
     let {
        // userList, 
        articleList, 
        categoryList,
    } = req
    res.send({
        // userList: userList,
        articleList: articleList,
        categoryList: categoryList,
    })
 })

 module.exports = indexRouter;