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
  // var u = JSON.parse(Object.keys(JSON.parse(JSON.stringify(req.body)))[0]);
  console.log(req.body);
  var u = req.body;
  var id;
  /* 生成id */
  con.query('select * from Users',(err, result) => {
    if(err){
      console.log(err);
    }
    else{
      id = parseInt(result[result.length-1].userId) +1;
      /* 服务器生成图片 */
      if(u.avatarDIY == true){
        imgName = 'aaa.jpg';
        var base64 = u.imgData.replace(/^data:image\/\w+;base64,/, "");
        //读取图片到服务端
        var path='../images/'+imgName;
        var dataBuffer=Buffer.from(base64,'base64');
        fs.writeFile(path,dataBuffer,function(err){
            if(err){
                console.log(err);
            }else{
                console.log('写入成功');
            }
        })
      }else{
        u.userGender == '女' ? imgName = 'girl.jpg' : imgName = 'boy.jpg'
      }
      /* 插入新用户 */
      con.query('insert into Users values(?,?,?,?,?,?,?,?,?,?,?,?)',[JSON.stringify(id),u.userName,u.userPwd,u.userTel,u.userEmail,u.userProcity,u.userIntro,100,imgName,0,u.userGender,21],(err, result) => {
          if(err){
            console.log(err);
          }
          else{
            console.log('插入数据成功')
          }
        })   
     }
  })       
  res.end(); 
})
/* 登陆 */
router.post('/login', function(req, res, next) {
  var u = JSON.parse(obj);
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
  res.end(); 
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


