var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');
const fs = require('fs');
const http = require('http');
var con = mysql.createConnection(dbconfig);// 创建连接
con.connect();//链接

/* 注册 */
router.post('/register', function(req, res, next) {
  var u = JSON.parse(obj);
  con.query('insert into Users values(?,?,?,?,?)',[u.userId,u.userName,u.userPwd,u.userTel,u.userEmail,u.userProCity,u.userIntro,u.userScore,u.userImg,u.userState,u.userGender,u.userAge],(err, result) => {
      if(err){
        console.log(err);
      }
      else{
        console.log('插入数据成功')
      }
    })     
  res.end(); 
})

module.exports = router;
