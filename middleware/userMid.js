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
    },
    /**
     * 获取用户角色名称
     * @param {*} req 
     * @param {string} res 
     * @param {*} next 
     */
    getRole: (req, res, next) => {
        User.getRole().then(results => {
            req.roleList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取用户总数
     * @param {*} req 
     * @param {string} res 
     * @param {*} next 
     */
    getUserTotal: (req, res, next) => {
        User.getUserTotal().then(results => {
            req.userTotal = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getUserPage: (req, res, next) => {
        let {
            start,
            size
        } = req
        User.getUserPage(start,size).then(results => {
            req.userPageList = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}