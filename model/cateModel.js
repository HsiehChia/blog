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
}