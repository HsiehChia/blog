/**
 * 留言子应用
 */
const express = require('express')
const msgRouter = express()
const Msg = require('../../middleware/msgMid')
const User = require('../../middleware/userMid')
const Article = require ('../../middleware/articleMid')
 /**
  * 获取当前所有消息信息
  */
msgRouter.get('/', [
    Msg.getMsgTotal
], (req, res, next) => {
    let {
        msgTotal
    } = req
    // 设置每次显示5条
    let size = 5
    req.page = {};
    // 总人数
    req.page.msgTotal = msgTotal
    // 总页码数
    req.page.pageNum = Math.ceil(req.page.msgTotal / size); 
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
    next()
},[
    Msg.getMsgPage,
    Article.getArticle,
    User.getUser
] , (req, res) => {
    let {
        page,
        msgPageList,
        articleList,
        userList
    } = req
     for(let i = 0; i< msgPageList.length; i++){
       for(let j = 0; j<userList.length; j++){
         if(msgPageList[i].user_id == userList[j].id){
           msgPageList[i].username = userList[j].username
           msgPageList[i].role_id = userList[j].role_id
         }
        if(msgPageList[i].toUser_id == userList[j].id){
          msgPageList[i].toUsername = userList[j].username
        }
       }
       msgPageList[i].createTime = msgPageList[i].createTime.toLocaleString()
     }
     for (let m = 0; m < msgPageList.length; m++) {
       for (let n = 0; n < articleList.length; n++) {
          if(msgPageList[m].article_id == articleList[n].id){
            msgPageList[m].title = articleList[n].title
          }
       }
     }
    page.msgPageList = msgPageList
    res.send({
        page: page
    })
})
/**
 * 删除消息
 */
msgRouter.post('/delete', [
  Msg.deleteMsg
],(req, res)=> {
  if(req.affectedRows) {
    res.send({
        msg: 'delete msg success',
        code: 200
    })
  }else {
      res.send({
          msg: 'delete msg failed',
          code: 500
      })
  }
})
/**
 * 添加消息回复
 */
msgRouter.post('/add', [
  Msg.addMsg
],(req, res)=> {
  if(req.insertId) {
    res.send({
        msg: 'reply msg success',
        code: 200
    })
  }else {
      res.send({
          msg: 'reply msg failed',
          code: 500
      })
  }
})
/**
 * 得到指定文章下所有留言
 */
msgRouter.get('/articleId', [
  Msg.getMsgByArticleId,
  Article.getArticle,
  User.getUser
],(req, res)=> {
  let { 
    msgList,
    articleList,
    userList
  } = req
  for(let i = 0; i< msgList.length; i++){
      for(let j = 0; j<userList.length; j++){
        if(msgList[i].user_id == userList[j].id){
          msgList[i].username = userList[j].username
          msgList[i].role_id = userList[j].role_id
        }
        if(msgList[i].toUser_id == userList[j].id){
          msgList[i].toUsername = userList[j].username
        }
      }
      for(let k = 0; k<articleList.length; k++){
        if(msgList[i].article_id == articleList[k].id){
          msgList[i].title = articleList[k].title
        }
      }
      msgList[i].createTime = msgList[i].createTime.toLocaleString()
  }
  res.send({
    msgList: msgList
  })
})
module.exports = msgRouter