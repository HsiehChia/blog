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
}