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
    }
}