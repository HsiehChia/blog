/**
 * 消息中间件
 */
const Msg = require('../model/msgModel')
module.exports = {
    /**
     * 获取所有msg消息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getMsgList: (req, res, next) => {
        Msg.getMsgList().then(results => {
            req.msgList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取msg总数
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getMsgTotal: (req, res, next) => {
        let {keyword} = req.query
        keyword = keyword != '' && keyword ? '%'+keyword+'%': keyword
        Msg.getMsgTotal(keyword).then(results => {
            req.msgTotal = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取当前页面所有留言信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getMsgPage: (req, res, next) => {
        let {
            start,
            size
        } = req
        let {keyword} = req.query
        keyword = keyword != '' && keyword ? '%'+keyword+'%': keyword
        Msg.getMsgPage(keyword, start, size).then(results => {
            req.msgPageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除消息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     deleteMsg: (req, res, next) => {
        let { id } = req.body
        Msg.deleteMsg(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加消息回复
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     addMsg: (req, res, next) => {
        let {
            msg,
            user_id,
            article_id
        } = req.body
        let createTime = new Date()
        Msg.addMsg(msg, user_id, article_id, createTime).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取当前文章所有留言信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     getMsgByArticleId: (req, res, next) => {
        let { article_id } = req.query
        Msg.getMsgByArticleId(article_id).then(results => {
            req.msgList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}