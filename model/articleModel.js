 /**
  * 文章数据模型
  */
  module.exports = class Article extends require ('./model') {
    /**
     * 获取文章信息
     * @returns 文章所有信息
     */
    static getArticle() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM `article`'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取文章信息失败：' + err.message)
                reject(err)
            })
        })
    }
    /**
     * 获取文章总数
     * @returns 文章总数
     */
    static getArticleTotal(category_id, isHot){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS articleTotal FROM article WHERE 1=1'
            sql += category_id != '' && category_id ? ` AND category_id=${category_id}` : ''
            sql += isHot != '' && isHot ? ` AND isHot=${isHot}` : ''
            this.query(sql).then(results => {
                resolve(results[0].articleTotal)
            }).catch(err => {
                console.log('获取文章总数失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取热门文章
     * @returns 热门文章列表
     */
    static getHotArticleList () {
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM `article` WHERE isHot = 1'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取热门文章失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取文章类别
     * @returns 文章类别列表
     */
    static getCategory(){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM category'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取文章类别失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取当前页面用户
     * @param {integer} start 
     * @param {integer} size 
     * @returns 
     */
    static getArticlePage(start, size, category_id, isHot) {
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM article WHERE 1=1'

            sql += category_id != '' && category_id ? ` AND category_id=${category_id}` : ''
            sql += isHot != '' && isHot ? ` AND isHot=${isHot}` : ''

            sql += ' ORDER BY `createTime` DESC, id DESC LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取当前页面文章失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 根据id设置文章是否热门
     * @param {*} id 
     * @param {*} isHot 
     * @returns 
     */
    static editArticleHot(isHot, id){
        return new Promise ((resolve, reject) => {
            let sql = 'UPDATE article SET isHot = ? WHERE id = ?'
            this.query(sql, [isHot, id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('修该当前文章热门失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 搜索获得文章列表
     * @param {number} start 
     * @param {number} size 
     * @returns 
     */
    static getArticleByCateAndIsHot(start, size, category_id, isHot) {
        console.log('id:'+category_id+'hot:'+isHot);
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM article WHERE 1=1'

            sql += category_id != '' && category_id ? ` AND category_id=${category_id}` : ''
            sql += isHot != '' && isHot ? ` AND isHot=${isHot}` : ''

            sql += ' ORDER BY `createTime` DESC LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('搜索页面文章失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 删除文章
     * @param {integer} id 
     * @returns 
     */
    static deleteArticle (id){
        return new Promise ((resolve, reject) => {
            let sql = 'DELETE FROM article WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('删除文章失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 添加文章
     * @param {string} title 
     * @param {string} content 
     * @param {integer} isHot 
     * @param {integer} category_id 
     * @param {string} thumbnail 
     * @returns 
     */
    static addArticle (title, content, isHot, category_id, thumbnail, createTime) {
        return new Promise ((resolve, reject) => {
            let sql = 'INSERT INTO article (title, content, isHot, category_id, thumbnail, createTime) VALUES (?, ?, ?, ?, ?, ?)'
            this.query(sql, [title, content, isHot, category_id, thumbnail, createTime]).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log('添加文章失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 修改文章
     * @param {string} title 
     * @param {string} content 
     * @param {integer} isHot 
     * @param {integer} category_id 
     * @param {string} thumbnail 
     * @param {integer} id 
     * @returns 
     */
    static editArticle (title, content, isHot, category_id, thumbnail, id) {
        return new Promise ((resolve, reject) => {
            let sql = 'UPDATE article SET title = ?, content = ?, isHot = ?, category_id = ?, thumbnail = ? WHERE id = ?'
            this.query(sql, [title, content, isHot, category_id, thumbnail, id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('修改文章失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 通过id获得文章
     * @param {integer} id 
     * @returns 
     */
    static getArticleById(id) {
        return new Promise ((resolve, reject) => {
            id = id ? id : 1
            let sql = 'SELECT * FROM article WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('通过id获得文章失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * hits加一
     * @param {*} id 
     * @returns 
     */
    static addHits (id) {
        return new Promise ((resolve, reject) => {
            let sql = 'UPDATE article SET hits = hits + 1 WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('hits加一失败：' + err.message);
                reject(err)
            })
        })
    }
 }