 /**
  * 用户数据模型
  */
 module.exports = class User extends require ('./model') {
    /**
     * 用户登录
     * @param {string} username 
     * @param {string} password 
     * @returns 
     */
    static login (username, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,username,password FROM `user` WHERE username = ? AND PASSWORD = ? '
            this.query(sql, [username, password]).then( results => {
                resolve(results[0])
            }).catch (err => {
                console.log('用户登录失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取用户信息
     * @returns 用户所有信息
     */
    static getUser() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM `user`'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取用户信息失败：' + err.message)
                reject(err)
            })
        })
    }
 }