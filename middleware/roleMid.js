/**
 * 角色中间件
 */
const Role = require('../model/roleModel')
module.exports = {
    /**
     * 获取角色列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getRolePageList: (req, res, next) => {
        Role.getRolePageList().then(results => {
            req.rolePageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加角色
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     addRole: (req, res, next) => {
        let { name } = req.body
        Role.addRole(name).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 修改类目
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     editRole: (req, res, next) => {
        let {
            name,
            id
        } = req.body
        let role = {
            name: name,
            id: id
        }
        Role.editRole(role).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除类目
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deleteRole: (req, res, next) => {
        let { id } = req.body
        Role.deleteRole(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}