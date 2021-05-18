/**
 * 权限子路由
 */
const express = require('express')
const authRouter = express()

const Auth = require('../../middleware/authMid')

// 获取权限页面信息
// authRouter.get('/',[
//     Auth.getAuthList
// ], (req, res) => {
//     let {
//         authPageList
//     } = req
//     req.userList = []
//     req.articleList = []
//     req.cateList = []
//     req.roleList = []
//     req.authList = []
//     for (let i = 0; i < authPageList.length; i++) {
//         if (i < 4) {
//             req.userList[i] = authPageList[i]
//         } else if (i < 8) {
//             req.articleList[i-4] = authPageList[i]
//         } else if (i < 11) {
//             req.cateList[i-8] = authPageList[i]
//         } else if (i < 14) {
//             req.roleList[i-11] = authPageList[i]
//         } else {
//             req.authList[i-14] = authPageList[i]
//         }
//     }
//     res.send({
//         userList: req.userList,
//         articleList: req.articleList,
//         cateList: req.cateList,
//         roleList: req.roleList,
//         authList: req.authList
//     })
// })
authRouter.get('/',[
    Auth.getAuthList
], (req, res) => {
    let {
        authPageList
    } = req
    res.send({
        authPageList: authPageList
    })
})

// 修改权限描述
authRouter.post('/edit',[
    Auth.editAuth
], (req, res) => {
    if(req.affectedRows) {
        res.send({
            msg: 'edit auth description success',
            code: 200
        })
    }else {
        res.send({
            msg: 'edit auth description failed',
            code: 500
        })
    }
})

module.exports = authRouter