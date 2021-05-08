const mysql = require('mysql')

module.exports = class Model {
    // 连接对象
    static conn = null;

    /**
     * 数据库连接方法
     */
    static connect () {
        // 创建连接
        Model.conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '123456',
            database: 'myblog'
        })
        // 连接数据库
        Model.conn.connect(err => {
            if (err) {
                console.log(`数据库连接失败：${err.message}`)
            }
        })
    }

    /**
     * 关闭数据库连接
     */
    static end() {
        if (null != Model.conn) {
            Model.conn.end()
        }
    }

    /**
     * 通用查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
     */
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            // 连接数据库
            this.connect()
            // 创建查询
            Model.conn.query(sql,params,(err,results)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
            // 关闭数据库
            this.end()
        })
    }
    
}