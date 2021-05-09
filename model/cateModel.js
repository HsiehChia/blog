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
            let sql = 'SELECT * FROM `category`'
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
}