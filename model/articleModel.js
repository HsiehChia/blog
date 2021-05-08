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
 }