/**
 * 首页路由
 */
 const express = require('express')
 var indexRouter = express.Router();

 const Article = require('../../middleware/articleMid')
 const Category = require('../../middleware/cateMid')

 //加载首页页面
indexRouter.get('/', [
    Article.getArticleTotal
], (req, res, next) => {
    let {
        articleTotal
    } = req
    // 设置每次显示8条
    let size = 8
    req.page = {};
    // 总人数
    req.page.articleTotal = articleTotal
    // 总页码数
    req.page.pageNum = Math.ceil(req.page.articleTotal / size); 
    // 当前页码数 p
    // 当前页码数不存在则为1，存在则为自己
    req.page.p = req.query.p? req.query.p: 1; 
    // 如果当前页码大于总页码数，则为最大数，否则为自己
    req.page.p = (req.page.p > req.page.pageNum) ? req.page.pageNum : req.page.p; 
    // 如果当前页码数小于1 则为1，否则为自己
    req.page.p = (req.page.p < 1) ? 1 : req.page.p;
    // 开始位置
    req.start = Number((req.page.p - 1) * size);
    // 每次取数据条数
    req.size = size;
    next()
},[
    Article.getArticlePage,
    Article.getCategory
] , (req, res) => {
    let {
        articlePageList,
        categoryList,
        page
    } = req
     for(let i = 0; i< articlePageList.length; i++){
         for (let j = 0; j<categoryList.length; j++){
             if(articlePageList[i].category_id == categoryList[j].id){
                 articlePageList[i].category_name = categoryList[j].name
             }
             if(articlePageList[i].isHot == 1){
                 articlePageList[i].isHot = true
             }else{
                 articlePageList[i].isHot = false
             }
         }
        articlePageList[i].createTime = articlePageList[i].createTime.toLocaleString()
     }
    page.articlePageList = articlePageList
    res.send({
        page: page
    })
})

// 
indexRouter.get('/hot', [
    Article.getHotArticleList
], (req, res) => {
    let {
        hotArticleList
    } = req
    res.send({
        hotArticleList: hotArticleList
    })
})

 module.exports = indexRouter;