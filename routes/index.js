var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/school';
// 图处上传引用包
var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
//     var queryMovies=function(db,callback){
//     var connMovies = db.collection('movies');
//     console.log("链接成功")
// }
//     queryMovies();
	console.log(req.session.email);
  res.render('index', { title: 'Express',htmlView:'<b>htmlView blod</b>',email:req.session.email });
});


router.get('/login',function(req,res){
	// res.send('login page');
	res.render('login',{});
});

router.get('/register',function(req,res){
	// res.send('register page');
	res.render('register',{});
});

router.get('/logout',function(req,res){
	// 方法一
	// req.session.email = undefined;
	// 方法二
	req.session.destroy(function(err){
		res.redirect('/');
	})
	

});

router.get('/comment',function(req,res){
	res.render('comment',{});
});


router.post('/uploadImg', function(req, res) {
    var form = new multiparty.Form();
    //设置编码
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = './uploadtemp';
    //设置文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;

    form.parse(req,function(err,fields,files){
        var uploadurl = './images/upload/';
        file = files['filedata'];
        originalFilename = file[0].originalFilename; // 原始文件名
        tmpPath = file[0].path;

        var timestamp = new Date().getTime();
        uploadurl += timestamp + originalFilename;
        newPath = './public/' + uploadurl;

        var fileReadStream = fs.createReadStream(tmpPath);
        var fileWriteStream = fs.createWriteStream(newPath);
        fileReadStream.pipe(fileWriteStream); //管道流
        fileWriteStream.on('close',function(){
            fs.unlinkSync(tmpPath);
            res.send('{"err":"","msg":"'+uploadurl+'"}');
        })
    });
});
// 链接movies数据库，获得其电影名、图片路径、主演、评分、电影类型

module.exports = router;


// express 解析url 
// ---> 到app.js里找模块 
// ---> 指定的模块有没有对应到相应的路由 
// ---> 寻找支持的js模板引擎 
// ---> 对应的路由匹配对应的ejs模板引擎进行渲染 
// --->将指定的对应渲染到相应的模板引擎页面中

// http://localhost:3000/login
// http://localhost:3000/register
