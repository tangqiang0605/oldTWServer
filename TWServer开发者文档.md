TWServer框架开发文档

Tangqiang Web Server

不按顺序

编写代码

调试

编写文档

发布npm

1. 创建一个记录框架开发过程的开发者文档。创建一个介绍使用和记录idea的使用者文档
2. npm init -y
npm install nodemon -D
npm install mysql
3. 创建文件。bin/www.js,写入代码。创建文件appjs，写入代码


``` js
const http=require('http');
const serverHandler=require('../app');
const PORT=5000;
const server=http.createServer(serverHandler);

server.listen(PORT,()=>{
    console.log(`server running at port '${PORT}`)
})
```

``` js
const serverHandler=(req,res)=>{
    res.setHeader('Content-Type','application/json');
    const responseData={
        
    };
    
    res.end(JSON.stringify(responseData))
}

module.exports=serverHandler;
```



4. packagejson配置。main入口改为bin/www.js，script改为"dev":"nodemon bin/www.js"
5. 运行npm run dev
6. 创建路由函数。src/routes/blogjs。写入代码


``` js
const handleBlogRoute=(req,res)=>{
    const method=req.method;
    const url=req.url;
    const path=url.split('?')[0];

    if(method==='GET'&&path==='/api/blog/list'){
        return {
            message:"get success"
        }
    }
    if(method==='POST'&&path==='/api/blog/new'){
        return {
            message:"post success"
        }
    }
    
}

module.exports = handleBlogRoute;
```
7. appjs使用route

``` js
const handleBlogRoute=require('./src/routes/blog');

const serverHandler=(req,res)=>{
    res.setHeader('Content-Type','application/json');
    
    const blogData=handleBlogRoute(req,res);
    
    if(blogData){
        res.end(JSON.stringify(blogData));
        return;
    }
    
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.write('404 Not Found');
    res.end();
}

module.exports=serverHandler;
```
8. 使用apipost进行接口测试localhost:5000/api/blog/list,localhost:5000/api/blog/new
9. git init
10. .gitignore写入node_modules