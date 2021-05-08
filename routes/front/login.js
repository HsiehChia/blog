/**
 * 登录子应用
 */
const express = require('express')
const User = require('../../model/userModel')
// const User = require('../../middleware/userMid')

var loginRouter = express.Router();

// 加载登陆页面后
loginRouter.get('/', (req, res, next) => {
    res.send('get login page')
})

// 实现登陆操作
loginRouter.post('/', (req, res, next) => {
    let { username, password } = req.body
    User.login(username, password).then(result => {
        if(result){
            res.send({ 
                code: 200,
                msg: '登录成功',
                role_id: result.role_id,
                username: username,
                token: result.id+result.username
            })
        }else{
            res.send({
                code: 500,
                msg: '用户名或者密码错误'
            })
        }
    }).catch(err =>{
        next(err)
    })
})
// 验证
loginRouter.get('/verify', (req, res) => {
    let ver = req.headers.authorization
    console.log(ver);
})

module.exports = loginRouter;