/**
 * 留言数据模型
 */
 module.exports = class Msg extends require ('./model') {
     /**
      * 获取消息列表
      * @returns 消息列表
      */
     static getMsgList () {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM message'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取消息列表信息失败：' + err.message);
                reject(err)
            })
        })
     }
     /**
      * 获取消息总条数
      * @returns 消息总数
      */
    static getMsgTotal(keyword){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS msgTotal FROM message'
            sql += keyword != '' && keyword ? ` WHERE msg LIKE '${keyword}' `: ' WHERE 1=1'
            this.query(sql).then(results => {
                resolve(results[0].msgTotal)
            }).catch(err => {
                console.log('获取消息总数失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取当前页所有消息数据
     * @param {number} start 开始位置
     * @param {number} size 获取条数
     * @returns 
     */
     static getMsgPage(keyword, start, size){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM message'
            sql += keyword != '' && keyword ? ` WHERE msg LIKE '${keyword}'` : ' WHERE 1=1'
            sql += ' ORDER BY `createTime` DESC LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取当前页面消息失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 删除消息
     * @param {Integer} id 消息id
     * @returns 
     */
     static deleteMsg (id){
        return new Promise ((resolve, reject) => {
            let sql = 'DELETE FROM message WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('删除消息失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 添加消息回复
     * @param {string} msg 消息
     * @param {integer} user_id 用户id
     * @param {integer} article_id 评论的文章id
     * @param {Date} createTime 评论的时间
     * @returns 
     */
    static addMsg  (msg, user_id, toUser_id, article_id, createTime){
        return new Promise ((resolve, reject) => {
            let sql = 'INSERT INTO message (msg, user_id, toUser_id, article_id, createTime) VALUES (?, ?, ?, ?, ?)'
            this.query(sql, [msg, user_id, toUser_id, article_id, createTime]).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log('插入消息失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 通过文章id得到所有消息回复
     * @param {integer} article_id 
     * @returns 
     */
    static getMsgByArticleId (article_id) {
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM message WHERE article_id = ?'
            this.query(sql, article_id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取消息失败：' + err.message);
                reject(err)
            })
        })
    }
 }