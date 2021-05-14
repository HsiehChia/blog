/**
 * 类目子路由
 */
const express = require('express')
const cateRouter = express()

const Category = require('../../middleware/cateMid')

/**
 * 获取当前页类目列表
 */
cateRouter.get('/', [
    Category.getCategoryTotal
], (req, res, next) => {
    let {
        cateTotal
    } = req
    // 设置每次显示5条
    let size = 5
    req.page = {};
    // 总人数
    req.page.cateTotal = cateTotal
    // 总页码数
    req.page.pageNum = Math.ceil(req.page.cateTotal / size); 
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
    Category.getCategoryPage
] , (req, res) => {
    let {
        catePageList,
        page
    } = req
    page.catePageList = catePageList
    res.send({
        page: page
    })
})
/**
 * 添加类目
 */
 cateRouter.post('/add', [
    Category.addCategory
 ], (req, res) => {
   if(req.insertId){
     res.send({
           msg: 'add category success',
           code: 200
       })
     }else {
       res.send({
           msg: 'add category failed',
           code: 500
       })
     }
 })
 /**
 * 修改用户
 */
cateRouter.post('/edit',[
    Category.editCate
], (req, res) => {
    if(req.affectedRows) {
        res.send({
            msg: 'edit category success',
            code: 200
        })
    }else {
        res.send({
            msg: 'edit category failed',
            code: 500
        })
    }
})
/**
 * 删除类目
 */
 cateRouter.post('/delete', [
    Category.deleteCate
 ], (req, res) => {
   if(req.affectedRows){
     res.send({
           msg: 'delete category success',
           code: 200
       })
     }else {
       res.send({
           msg: 'delete category failed',
           code: 500
       })
     }
 })

module.exports = cateRouter