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
            this.query(sql, [username, password]).then(results => {
                resolve(results[0])
            }).catch (err => {
                console.log('用户登录失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 用户注册
     * @param {string} username 
     * @param {string} password 
     * @returns 
     */
    static register (username, password) {
        return new Promise((resolve, reject) => {
            let address = '四川省成都市'
            let email = 'default@qq.com'
            let sql = 'INSERT INTO `user` (username, `password`, address, email) VALUES (?, ?, ?, ?)'
            this.query(sql, [username, password, address, email]).then(results => {
                resolve(results.affectedRows)
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
    static getUserTotal(username){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS userTotal FROM `user`'
            sql += username != '' && username ? ` WHERE username LIKE '${username}' `: ' WHERE 1=1'
            this.query(sql).then(results => {
                resolve(results[0].userTotal)
            }).catch(err => {
                console.log('获取总用户数失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 获取当前页所有用户数据
     * @param {number} start 开始位置
     * @param {number} size 获取条数
     * @returns 
     */
    static getUserPage(username, start, size){
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM `user`'
            sql += username != '' && username ? ` WHERE username LIKE '${username}'` : ' WHERE 1=1'
            sql += ' ORDER BY `createTime` DESC LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取当前页面用户失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 添加用户
     * @param {string} username 
     * @param {number} password 
     * @param {string} email 
     * @param {string} address 
     * @returns 
     */
    static addUser (username, password, email, address, createTime){
        return new Promise ((resolve, reject) => {
            let sql = 'INSERT INTO `user` (username, password, email, address, createTime) VALUES (?, ?, ?, ?, ?)'
            this.query(sql, [username, password, email, address, createTime]).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log('插入用户失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 修改用户
     * @param {object} user 用户对象
     * @returns 
     */
    static editUser (user){
        return new Promise ((resolve, reject) => {
            let sql = 'UPDATE `user` SET username = ?,email = ?,address = ? ,role_id = ? WHERE id = ?'
            this.query(sql, [
                user.username,
                user.email,
                user.address,
                user.role_id,
                user.id
            ]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('编辑修改用户失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 删除用户
     * @param {Integer} id 用户id
     * @returns 
     */
    static deleteUser (id){
        return new Promise ((resolve, reject) => {
            let sql = 'DELETE FROM `user` WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('删除用户失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 通过id获取当前用户信息
     * @param {integer} id 
     * @returns 
     */
    static getUserById(id) {
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT * FROM `user` WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取当前用户失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 前台修改用户
     * @param {*} user 
     * @returns 
     */
    static fixUser (user){
        return new Promise ((resolve, reject) => {
            let sql = 'UPDATE `user` SET username = ?,password = ?,email = ?,address = ? WHERE id = ?'
            this.query(sql, [
                user.username,
                user.password,
                user.email,
                user.address,
                user.id
            ]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('前台修改用户失败：' + err.message);
                reject(err)
            })
        })
    }
 }