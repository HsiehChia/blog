/**
 * 角色子路由
 */
const express = require('express')
const roleRouter = express()

const Role = require('../../middleware/roleMid')

/**
 * 获取角色列表
 */
roleRouter.get('/', [
    Role.getRolePageList
], (req, res) => {
    let {
        rolePageList
    } = req
    res.send({
        rolePageList: rolePageList
    })
})
/**
 * 编辑角色信息
 */
roleRouter.post('/edit', [
    Role.editRole
], (req, res) => {
    if(req.affectedRows) {
        res.send({
            msg: 'edit role success',
            code: 200
        })
    }else {
        res.send({
            msg: 'edit role failed',
            code: 500
        })
    }
})

module.exports = roleRouter