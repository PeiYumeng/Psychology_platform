var funcs = function(){};

//生成图片
funcs.prototype.createimg = function(iname,base64){
    var path='../images/'+iname;
    var dataBuffer=Buffer.from(base64,'base64');
    fs.writeFile(path,dataBuffer,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('写入成功');
        }
    })
};

module.exports = funcs;