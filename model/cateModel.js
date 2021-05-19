/**
 * 类目数据模型
 */
module.exports = class Category extends require ('./model') {
    /**
     * 获取类目信息
     * @returns 类目信息
     */
    static getCategory () {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM `category` ORDER BY sort'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取类目信息失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
    * 通过类目id获取文章
    * @param {integer} id 
    * @returns 
    */
    static getArticleByCategoryId(id) {
       return new Promise((resolve, reject) => {
           let sql = 'SELECT * FROM `article` WHERE `category_id` = ?'
           this.query(sql, id).then(results => {
               resolve(results)
           }).catch(err => {
               console.log('通过类目id获取文章信息失败：' + err.message)
               reject(err)
           })
       })
    }
    /**
     * 获取类目总数
     * @returns 类目数量
     */
    static getCategoryTotal(){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS cateTotal FROM category WHERE 1=1'
            this.query(sql).then(results => {
                resolve(results[0].cateTotal)
            }).catch(err => {
                console.log('获取类目总数失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取当前页面的类目信息
     * @param {*} start 
     * @param {*} size 
     * @returns 
     */
    static getCategoryPage(start, size) {
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM category WHERE 1=1 ORDER BY sort LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取当前页面类目失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 新增类目
     * @param {*} name 
     * @returns 
     */
    static addCategory (name){
        return new Promise ((resolve, reject) => {
            let sql = 'INSERT INTO category (`name`) VALUES (?)'
            this.query(sql, name).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log('新增类目失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 修改类目
     * @param {object} cate 类目对象
     * @returns 
     */
     static editCate (cate){
        return new Promise ((resolve, reject) => {
            let sql = 'UPDATE category SET `name` = ?, sort = ? WHERE id = ?'
            this.query(sql, [
                cate.name,
                cate.sort,
                cate.id
            ]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('编辑修改类目失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 删除类目
     * @param {*} id 
     * @returns 
     */
    static deleteCate (id){
        return new Promise ((resolve, reject) => {
            let sql = 'DELETE FROM category WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('删除类目失败：' + err.message);
                reject(err)
            })
        })
    }
}