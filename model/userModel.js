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
            let sql = 'SELECT * FROM `user` WHERE username = ? AND PASSWORD = ? '
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
    /**
     * 获取用户角色名称
     * @returns 用户角色名称
     */
    static getRole() {
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM role'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取用户角色名称失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取用户数量
     * @returns 用户数量
     */
    static getUserTotal(){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS userTotal FROM `user` WHERE 1=1 '
            this.query(sql).then(results => {
                resolve(results[0].userTotal)
            }).catch(err => {
                console.log('获取总用户数失败：' + err.message);
                reject(err)
            })
        })
    }
    static getUserPage(start, size){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM `user` WHERE 1=1 ORDER BY `createTime` DESC LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取当前页面用户失败：' + err.message);
                reject(err)
            })
        })
    }
 }