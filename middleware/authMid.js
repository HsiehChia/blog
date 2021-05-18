/**
 * 权限中间件
 */
const Auth = require('../model/authModel')
module.exports = {
    /**
     * 获取权限列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getAuthList: (req, res, next) => {
        Auth.getAuthList().then(results => {
            req.authPageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 修改权限描述
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    editAuth: (req, res, next) => {
        let { 
            description, 
            id
        } = req.body
        Auth.editAuth(description, id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}