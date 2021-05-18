/**
 * 权限数据模型
 */
 module.exports = class Auth extends require ('./model') {
     /**
      * 获取权限列表
      * @returns 权限列表
      */
     static getAuthList () {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM authority'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取权限列表信息失败：' + err.message);
                reject(err)
            })
        })
     }
     /**
      * 修改权限描述
      * @param {string} description 权限描述
      * @param {integer} id 权限id
      * @returns 
      */
     static editAuth (description, id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE authority SET description = ? WHERE id = ?'
            this.query(sql, [description, id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('修改权限描述信息失败：' + err.message);
                reject(err)
            })
        })
     }
 }