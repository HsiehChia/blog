/**
 * 文章路由
 */
const express = require('express')
const articleRouter = express()

const Article = require('../../middleware/articleMid')
const Category = require ('../../middleware/cateMid')

/**
 * 获取所有文章信息
 */
articleRouter.get('/', [
    Article.getArticle
], (req, res) => {
    let {
        articleList
    } = req
    res.send({
        articleList: articleList
    })
})
/**
 * 通过类目id获得所有文章信息
 */
articleRouter.get('/cate/:id', [
    Category.getArticleByCategoryId
], (req, res) => {
    let {
        articleListByCateId
    } = req
    res.send({
        articleListByCateId: articleListByCateId
    })
})

module.exports = articleRouter