/**
 * 登录子应用
 */
const express = require('express')
const User = require('../../middleware/userMid')

var loginRouter = express.Router();

// 加载登陆页面后
loginRouter.get('/', (req, res, next) => {
    res.send('get login page')
})

// 实现登陆操作
loginRouter.post('/', [
    User.login
], (req, res) => {
    let { 
        user
    } = req
    if(user) {
        res.send({
            code: 200,
            msg: '登录成功',
            role_id: user.role_id,
            username: user.username,
            token: user.id+user.username,
            user_id: user.id
        })
    }else{
        res.send({
            code: 500,
            msg: '用户名或者密码错误'
        })
    }
})

// 注册
loginRouter.post('/register', [
    User.login
], (req, res, next) => {
    if(req.user) {
        res.send ({
            code: 400,
            msg: '已经注册过了，请直接登录'
        })
    }else {
        next();
    }
}, [
    User.register
], (req, res)=>{
    if(req.affectedRows){
        res.send ({
            code: 200,
            msg: '注册成功'
        })
    }else {
        res.send({ 
            code: 500,
            msg: '注册失败'
        })
    }
})
// 通过id得到当前用户信息
loginRouter.post('/userInfo', [
    User.getUserById
], (req, res) => {
    let { userInfo } = req
    res.send({
        userInfo: userInfo
    })
})

// 修改用户信息
loginRouter.post('/fix',[
    User.fixUser
], (req, res) => {
    if(req.affectedRows){
        res.send ({
            code: 200,
            msg: '前台修改用户信息成功'
        })
    }else {
        res.send({ 
            code: 500,
            msg: '前台修改用户信息失败'
        })
    }
})

module.exports = loginRouter;