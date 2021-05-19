/**
 * 类目中间件
 */
const Category = require('../model/cateModel')
module.exports = {
    /**
     * 获取类目所有信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getCategory: (req, res, next) => {
        Category.getCategory().then(results => {
            req.categoryList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 通过类目id获取文章列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getArticleByCategoryId: (req, res, next) => {
        let id = req.params.id
        Category.getArticleByCategoryId(id).then(results => {
            req.articleListByCateId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取类目总数
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getCategoryTotal: (req, res, next) => {
        Category.getCategoryTotal().then(results => {
            req.cateTotal = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取当前页面的类目信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     getCategoryPage: (req, res, next) => {
        let { 
            start, 
            size
        } = req
        Category.getCategoryPage(start, size).then(results => {
            req.catePageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除类目
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deleteCate: (req, res, next) => {
        let { id } = req.body
        Category.deleteCate(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 修改类目
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     editCate: (req, res, next) => {
        let {
            name,
            sort,
            id
        } = req.body
        let user = {
            name: name,
            sort: sort,
            id: id
        }
        Category.editCate(user).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加类目
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     addCategory: (req, res, next) => {
        let { name } = req.body
        Category.addCategory(name).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}