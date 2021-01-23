var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var fs=require('fs');
var https=require('https');

var privateKey=fs.readFileSync('./3745209_magiskq.top.key'); 此处是你的ssl证书文件
var certificate=fs.readFileSync('./3745209_magiskq.top.pem'); 此处是你的ssl证书文件
var credentials= {key:privateKey,cert:certificate};

var httpsPort = "3000"
var httpsServer = https.createServer(credentials,app);
httpsServer.listen(httpsPort,'0.0.0.0');


var app = express();
var server = app.listen(8080);
// view engine setup
// app.set('views')用来指明视图文件所在目录
app.set('views', path.join(__dirname, 'views'));
// 指明视图模板的类型 ejs
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 中间件，指明静态资源的路径，所有的静态资源请求例如图片、js脚本、css样式，都回去该目录下查找资源
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
app.get('/', (req, res, next) => {
  console.log(Object.keys(req))
  console.log(req.headers)
  console.log(req.query)
  console.log(Object.keys(res))
  res.send('Hello World')
})
//app.listen(3000,(err)=>{
  //if (!err) console.log('服务器启动成功了！')
  //else console.log(err)
//})
//app.listen(8080)
module.exports = app;
