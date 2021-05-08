/**
 * 文章中间件
 */
 const Article = require('../model/articleModel')
 module.exports = {
     /**
      * 获取文章列表
      * @param {*} req 请求数据
      * @param {string} res 返回数据
      * @param {*} next 下一个
      */
     getArticle: (req, res, next) => {
         Article.getArticle().then(results => {
             req.articleList = results
             next()
         }).catch(err =>{
             next(err)
         })
     }
 }