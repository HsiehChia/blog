/**
 * 用户中间件
 */
const User = require('../model/userModel')
module.exports = {
    /**
     * 获取用户列表
     * @param {*} req 请求数据
     * @param {string} res 返回数据
     * @param {*} next 下一个
     */
    getUser: (req, res, next) => {
        User.getUser().then(results=>{
            req.userList = results
            next()
        }).catch(err=>{
            next(err)
        })
    }
}