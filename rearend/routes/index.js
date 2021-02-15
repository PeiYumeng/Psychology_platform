var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');
const fs = require('fs');
const http = require('http');
var funcs = require('./fonction.js');
var con = mysql.createConnection(dbconfig);// 创建连接
con.connect();//链接
var io = require('socket.io');
/* 显示图片*/
router.get('/images/:photo', function(req, res) {
  var photo = req.params.photo;
  optfile.readImg('../images/'+photo, res);
})
/* 注册 */
router.post('/register', function(req, res, next) {
  var u = req.body;
  var id;
  //判断用户昵称是否唯一
  //生成id
  con.query('select * from Users',(err, result) => {
    if(err){
      console.log(err);
    }
    else{
      id = parseInt(result[result.length-1].userId) +1;
      //服务器生成图片
      if(u.avatarDIY == true){
        imgName = u.userName+id+'.jpg';
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
      //插入新用户
      con.query('insert into Users values(?,?,?,?,?,?,?,?,?,?,?,?)',[JSON.stringify(id),u.userName,u.userPwd,u.userTel,u.userEmail,u.userProcity,u.userIntro,100,imgName,0,u.userGender,u.userAge*1],(err, result) => {
          if(err){
            console.log(err);
            res.send('插入数据失败'); 
          }
          else{
            console.log('插入数据成功')
            res.send('插入数据成功'); 
          }
        })   
     }
  })       
})
/* 登陆 */
router.post('/login', function(req, res, next) {
  var u = req.body;
  console.log(u);
  con.query("select * from Users where userName =?;",[u.userName],function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log(result)
        if(result.userPwd == u.userPwd){
          res.send('登陆成功');
        }else{
          res.send('用户密码信息错误');
        }
      }
     })
})
/* 提交认证 */
router.post('/authentication', function(req, res, next) {
  var u = req.body;
  //更改用户状态
  con.query("update Users set userState=1;",function(err,result){
      if(err){
        console.log(err);
      }
  })
  //服务器生成简历
  var rename;
  if(u.avatarDIY == true){//变量
      rename = u.userName+id+'_resume.pdf';
      var base64 = u.imgData.replace(/^data:image\/\w+;base64,/, "");//?
      funcs.createimg(rename,base64);
  }
  //学历认证图片
  var eduname;
  if(u.avatarDIY == true){//变量
    eduname = u.userName+id+'_edu.jpg';
    var base64 = u.imgData.replace(/^data:image\/\w+;base64,/, "");//?
    funcs.createimg(eduname,base64);
  }
  //资格认证图片
 var cername = u.userName+id+'_cer.jpg';
  var base = u.imgData.replace(/^data:image\/\w+;base64,/, "");//?
  funcs.createimg(eduname,base);
  //插入数据
  con.query("insert into Doctors values(?,?,?,?,?,?,?,?,?,?,?);",[u.userId,u.docEdu,eduname,u.docCert,cername,rename,u.docHop,u.dopAdd,0,u.docWell,0],function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result)
      res.send('插入数据成功'); 
    }
   })
})
/* 判断用户是否在线 */

/* 后台管理系统检查资格认证 */
router.post('/manage_authentication', function(req, res, next) {
  con.query("select * from Doctors,Users where userState =1;",function(err,result){//?
    if(err){
      console.log(err);
    }else{
      console.log(result);
      //荷兰国旗区分资格认证
    }
   })
})
/* 后台管理系统检查学历认证 */
router.post('/manage_authentication', function(req, res, next) {
  con.query("select * from Doctors,Users where userState =1;",function(err,result){//?
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
   })
})
/* 后台管理系统通过认证 */
router.post('/manage_authentication_pass', function(req, res, next) {
  var u = req.body;
  //更改用户状态
  con.query("update Users set userState=2;",function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log('认证通过')
      }
  })
})
module.exports = router;


