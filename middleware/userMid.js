/**
 * 用户中间件
 */
const User = require('../model/userModel')
module.exports = {
    /**
     * 用户登录
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    login: (req, res, next) => {
        let { 
            username, 
            password 
        } = req.body
        User.login(username, password).then(results=>{
            req.user = results
            next()
        }).catch(err=>{
            next(err)
        })
    },
    register: (req, res, next) => {
        let { 
            username, 
            password 
        } = req.body
        User.register(username, password).then(results=>{
            req.affectedRows = results
            next()
        }).catch(err=>{
            next(err)
        })
    },
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
        let {username} = req.query
        username = username != '' && username ? '%'+username+'%': username
        User.getUserTotal(username).then(results => {
            req.userTotal = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取当前页所有用户数据
     * @param {*} req 
     * @param {string} res 
     * @param {*} next 
     */
    getUserPage: (req, res, next) => {
        let {
            start,
            size
        } = req
        let {username} = req.query
        username = username != '' && username ? '%'+username+'%': username
        User.getUserPage(username, start,size).then(results => {
            req.userPageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加用户
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    addUser: (req, res, next) => {
        let {
            username,
            password,
            email,
            address
        } = req.body
        let createTime = new Date()
        User.addUser(username, password, email, address, createTime).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 修改用户
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    editUser: (req, res, next) => {
        let {
            id,
            username,
            email,
            address,
            role_id
        } = req.body
        let user = {
            id:id,
            username:username,
            email:email,
            address:address,
            role_id:role_id
        }
        User.editUser(user).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除用户
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deleteUser: (req, res, next) => {
        let { id } = req.body
        User.deleteUser(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 通过id获取当前用户信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getUserById: (req, res, next) => {
        let { id } = req.body
        User.getUserById(id).then(results => {
            req.userInfo = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 前台修改用户
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     fixUser: (req, res, next) => {
        let {
            id,
            username,
            password,
            email,
            address
        } = req.body
        let user = {
            id:id,
            username:username,
            password:password,
            email:email,
            address:address
        }
        User.fixUser(user).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}