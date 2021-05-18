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
    Article.getArticleTotal
], (req, res, next) => {
    let {
        articleTotal
    } = req
    // 设置每次显示5条
    let size = 5
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
    page.categoryList = categoryList
    res.send({
        page: page
    })
})
/**
 * 获取所有类目信息
 */
articleRouter.get('/cate', [
    Category.getCategory
  ], (req, res) => {
      let {
        categoryList
      } = req
      res.send({
        categoryList: categoryList
      })
})
/**
 * 通过id获取文章
 */
articleRouter.get('/id', [
    Article.getArticleById
], (req, res) => {
    let {
        articleInfo
    } = req
    res.send({
        articleInfo: articleInfo
    })
})
/**
 * 指定文章热门设置
 */
articleRouter.post('/isHot', [
  Article.editArticleHot
], (req, res) => {
  if(req.affectedRows){
    res.send({
          msg: 'set article isHot success',
          code: 200
      })
    }else {
      res.send({
          msg: 'set article isHot failed',
          code: 500
      })
    }
})
/**
 * 添加文章
 */
articleRouter.post('/add',[
    Article.addArticle
], (req, res) => {
    if(req.insertId){
        res.send({
              msg: 'add article success',
              code: 200
          })
        }else {
          res.send({
              msg: 'add article failed',
              code: 500
          })
        }
})
/**
 * 删除文章
 */
 articleRouter.post('/delete', [
    Article.deleteArticle
  ], (req, res) => {
    if(req.affectedRows){
      res.send({
            msg: 'delete article success',
            code: 200
        })
      }else {
        res.send({
            msg: 'delete article failed',
            code: 500
        })
      }
  })
  /**
   * 图片上传
   */
//  articleApp.post('/upload', (req, res) => {
//     if (req.uploadUrl) {
//         res.json({
//             uploaded: true,
//             url: req.uploadUrl
//         })
//     } else {
//         res.json({
//             uploaded: false,
//             err: { message: '上传失败' }
//         })
//     }
// })

module.exports = articleRouter