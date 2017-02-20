const fs =  require('fs');
//1.查看状态
fs.stat('public',(error,stats)=>{
	if(error){
		console.log(error)
	}else{
		console.log(`文件:${stats.isFile()}`);
	}
	
})
//2.fs.mkdir()创建目录
//3.fs.writeFile()//写文件到目录
//4.fs.appendFile()；//追加内容
//5.读文件
// fs.readFile('./public/images/logo.png','utf8',(error,data)=>{
// 	if(error){
// 		console.log(error);
// 	}else{
// 		console.log(data);
// 	}
// })
// class Demo {
// 	// subtotal(unitPrice,quantity){
// 	// 	return unitPrice * quantity;
// 	// }
// }
// module.exports = Demo;