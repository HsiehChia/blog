/**
 * 角色数据模型
 */
module.exports = class Role extends require ('./model') {
    /**
     * 获取角色列表
     * @returns 
     */
    static getRolePageList () {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM role'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取角色列表信息失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 修改角色
     * @param {string} name 角色对象
     * @returns 
     */
     static addRole (name){
        return new Promise ((resolve, reject) => {
            let sql = 'INSERT INTO role (name) VALUES (?)'
            this.query(sql, name).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log('插入角色失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 修改角色
     * @param {object} role 角色对象
     * @returns 
     */
     static editRole (role){
        return new Promise ((resolve, reject) => {
            let sql = 'UPDATE role SET `name` = ? WHERE id = ?'
            this.query(sql, [
                role.name,
                role.id
            ]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('编辑修改角色失败：' + err.message);
                reject(err)
            })
        })
    }
    /**
     * 删除角色
     * @param {Integer} id 角色id
     * @returns 
     */
    static deleteRole (id){
        return new Promise ((resolve, reject) => {
            let sql = 'DELETE FROM role WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log('删除角色失败：' + err.message);
                reject(err)
            })
        })
    }
}