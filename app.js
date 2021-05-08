var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var session = require('cookie-session')

const indexRouter = require('./routes/front/index')
const loginRouter = require('./routes/front/login')

var app = express();

// 设置跨域
app.all('/*', (req, res, next)=>{
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 允许自定义响应头请求
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// post请求格式设置
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session设置
// app.use(session({
//   keys: ['secret'],
//   maxAge: 1000 * 60 * 30
// }))

// 调用首页子应用
app.use('/', indexRouter)
// 调用登录子应用
app.use('/login', loginRouter)
// 调用文章子应用

// 调用搜索子应用


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,'127.0.0.1', () => {
  console.log('serve started on http://127.0.0.1:3000')
})
