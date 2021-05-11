/**
 * 用户路由
 */
 const express = require('express')
 const userRouter = express()

 const User = require('../../middleware/userMid')
 
 /**
  * 获取所有用户信息
  */
//  userRouter.get('/', [
//      User.getUser,
//      User.getRole,
//      User.getUserTotal
//  ], (req, res) => {
//      let {
//          userList,
//          role,
//          userTotal
//      } = req
//      let size = 5
//      let pageNum = Math.ceil(userTotal / size); 
//      for(let i = 0; i< userList.length; i++){
//          for(let j = 0; j<role.length; j++){
//              if(userList[i].role_id == role[j].id){
//                 userList[i].roleName = role[j].name
//              }
//          }
//      }
//      res.send({
//          userList: userList,
//          userTotal: userTotal,
//          pageNum: pageNum
//      })
//  })

userRouter.get('/', [
    User.getUserTotal
], (req, res, next) => {
    let {
        userTotal
    } = req
    // 设置每次显示5条
    let size = 3
    req.page = {};
    // 总人数
    req.page.userTotal = userTotal
    // 总页码数
    req.page.pageNum = Math.ceil(req.page.userTotal / size); 
    // 当前页码数 p
    // 当前页码数不存在则为1，存在则为自己
    req.page.p = req.query.p? req.query.p: 1; 
    // 如果当前页码大于总页码数，则为最大数，否则为自己
    req.page.p = (req.page.p > req.page.pageNum) ? req.page.pageNum : req.page.p; 
    // 如果当前页码数小于1 则为1，否则为自己
    req.page.p = (req.page.p < 1) ? 1 : req.page.p;
    // 开始位置
    req.start = Number((req.page.p - 1) * size);
    // 每次取数据条数
    req.size = size;
    console.log(res.start, res.size);
    next()
},[
    User.getRole,
    User.getUserPage
] , (req, res) => {
    let {
        page,
        userPageList,
        roleList
    } = req
     for(let i = 0; i< userPageList.length; i++){
         for(let j = 0; j<roleList.length; j++){
             if(userPageList[i].role_id == roleList[j].id){
                userPageList[i].roleName = roleList[j].name
             }
         }
         userPageList[i].createTime = userPageList[i].createTime.toLocaleString()
     }
    page.userPageList = userPageList
    res.send({
        page: page
    })
})
 
 module.exports = userRouter