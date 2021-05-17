var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
// var session = require('cookie-session')

const indexRouter = require('./routes/front/index')
const loginRouter = require('./routes/front/login')
const homeCateRouter = require('./routes/front/cate')

const aricleRouter = require('./routes/admin/article')
const userRouter = require('./routes/admin/user')
const cateRouter = require('./routes/admin/cate')
const roleRouter = require('./routes/admin/role')

var app = express();

// 设置跨域
app.all('/*', (req, res, next)=>{
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 允许自定义响应头请求
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

// 上传文件配置
const upload = multer ({
  // 上传文件的存储目录
  dest: './static/upload', 
  // 单个文件大小限制在2M以内
  limits: {
      fileSize: 1024 * 1024 * 2
  }
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

// 前台：
// 调用首页子应用
app.use('/home/index', indexRouter)
// 调用登录子应用
app.use('/login', loginRouter)
// 调用分类子应用
app.use('/home/cate', homeCateRouter)

// 后台：
// 调用用户子应用
app.use('/user', userRouter)
// 调用文章子应用
app.use('/article', aricleRouter)
// 调用类目子应用
app.use('/cate', cateRouter)
// 调用角色子应用
app.use('/role', roleRouter)

// 单文件上传操作
app.post('/*', upload.single('upload'), (req, res, next) => {
  // 上传成功后的文件对象
  let { file } = req
  if (file) {
      //  file.originalname ==> 文件的原名称
      let extname = path.extname(file.originalname)
      // file.path ==> 上传后的文件路径
      fs.renameSync(file.path, file.path + extname)
      // file.filename ==> 上传后的文件名
      req.uploadUrl = '/upload/' + file.filename + extname
  }
  next()
})

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
