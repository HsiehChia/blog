const express = require('express')
const app = express()
const indexRouter = require('./route/front/index')
const loginRouter = require('./route/front/login')
// 设置跨域
app.all('/*', (req, res, next)=>{
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 允许自定义响应头请求
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

// 静态资源配置
// app.use(express.static('static'))

// POST请求处理
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 调用首页子应用
app.use('/index', indexRouter)
// 调用登录子应用
app.use('/login', loginRouter)
// 调用文章子应用

// 调用搜索子应用

app.listen(3000,'127.0.0.1', () => {
  console.log('serve started on http://127.0.0.1:3000')
})