var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');
const fs = require('fs');
const http = require('http');
var con = mysql.createConnection(dbconfig);// 创建连接
con.connect();//链接

//显示图片
router.get('/images/:photo', function(req, res) {
  var photo = req.params.photo;
  optfile.readImg('../images/'+photo, res);
})
/* 注册 */
router.post('/register', function(req, res, next) {
  //var u = JSON.parse(obj);
  console.log(JSON.parse(JSON.stringify(req.body)));
  var u = JSON.parse(JSON.stringify(req.body))
  console.log(u.userId)
  con.query('insert into Users values(?,?,?,?,?,?,?,?,?,?,?,?)',[u.userId,u.userName,u.userPwd,u.userTel,u.userEmail,u.userProCity,u.userIntro,u.userScore,u.userImg,u.userState,u.userGender,u.userAge],(err, result) => {
      if(err){
        console.log(err);
      }
      else{
        console.log('插入数据成功')
      }
    })     
  res.end(); 
})
/* 登陆 */
router.post('/login', function(req, res, next) {
  // var u = JSON.parse(obj);
  var u = JSON.parse(JSON.stringify(req.body));
  console.log(u);
  con.query("select * from Users where userId =?;",[u.userId],function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log(result)
        res.send(result);
      }
     })
  // res.end(); 
})
/* 认证 */
router.post('/authentication', function(req, res, next) {
  // var u = JSON.parse(obj);
  // var u  = req.body.userId;
  // con.query("select * from Users where userName =?;",[u],function(err,result){
  //     if(err){
  //       console.log(err);
  //     }else{
  //       console.log(result)
  //       res.send(result);
  //     }
  //    })
  // res.end(); 
})
module.exports = router;
