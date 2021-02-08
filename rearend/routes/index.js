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
  var u = JSON.parse(JSON.stringify(req.body));
  var id,img;
  /* 生成id */
  con.query('select * from Users',(err, result) => {
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      id = parseInt(result[result.length-1].userId) +1;
      /* 服务器生成图片 */
      if(u.userImg != undefined){
        var base64 = u.userImg.replace(/^data:image\/\w+;base64,/, "");
        //var base64=u.userImg.base64[0].url.split(',')[1];
        //var base64 = base_64_url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
        console.log(base64)
        var data=new Date();
        var img_name1=''+data.getFullYear()+data.getMonth()+data.getDate()+data.getHours()+data.getMinutes()+data.getSeconds();
        var img_name=JSON.stringify(img_name1);
        img=JSON.stringify(id+img_name);
        console.log(img)
        //读取图片到服务端
        var path='../images/'+img+'.jpg';
        console.log(path);
        var dataBuffer=Buffer.from(base64,'base64');
        fs.writeFile(path,dataBuffer,function(err){
            if(err){
                console.log(err);
            }else{
                console.log('写入成功');
            }
        })
      }
      /* 插入新用户 */
      con.query('insert into Users values(?,?,?,?,?,?,?,?,?,?,?,?)',[JSON.stringify(id),u.userName,u.userPwd,u.userTel,u.userEmail,u.userProCity,u.userIntro,u.userScore,img,u.userState,u.userGender,u.userAge],(err, result) => {
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
