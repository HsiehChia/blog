/**
 * 类目中间件
 */
const Category = require('../model/cateModel')
module.exports = {
    getCategory: (req, res, next) => {
        Category.getCategory().then(results => {
            req.categoryList = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}