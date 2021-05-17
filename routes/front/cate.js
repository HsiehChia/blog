/**
 * 类目子路由
 */
const express = require('express')
const homeCateRouter = express()

const Category = require('../../middleware/cateMid')

homeCateRouter.get('/', [
    Category.getCategory
], (req, res) => {
    let { 
        categoryList
    } = req
    res.send({
        categoryList: categoryList
    })
})
homeCateRouter.get('/:id', [
    Category.getArticleByCategoryId
], (req, res, next) => {
    let {
        articleListByCateId
    } = req
    for (let i = 0; i<articleListByCateId.length; i++) {
        articleListByCateId[i].createTime = articleListByCateId[i].createTime.toLocaleString()
    }
    res.send({
        articleListByCateId: articleListByCateId
    })
})

module.exports = homeCateRouter