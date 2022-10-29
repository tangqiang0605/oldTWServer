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
9. git init。先关掉服务器。
10. .gitignore写入node_modules。
11. 提交到github上，查看github上的仓库，ok，并新建分支dev
12. 修改appjs
13. 修改route/blog.js
14. 新建文件src/model/responseModel.js
14. 新建文件src/controllers/blog.js
const {execSQL}=require('../db/mysql')

const getList=(author,keyword)=>{
    const sql=`select * from blogs where 1=1 `;
    
    if(author){
        sql+=`and author ='${author} '`;
    }
    if(keyword){
        sql+=`and title like '%${keyword}%'`;
    }
    

    return execSQL(sql);
}

const getDetail=(id)=>{
    const sql='select * from blogs';
    execSQL(sql).then(result=>{
        concole.log(result);
    })
    return {};
}

module.exports={
    getList,
    getDetail
}
16. 新建文件src/db/mysql.js
17. 新建文件src/config/db.js
18. 使用数据库test4tws
use test4tws
show tables;
insert into blogs(title,context,author) values ('标题1','内容一二三','张三'); 
insert into blogs(title,context,author) values ('标题2','内容一二三','张三'); 
insert into blogs(title,context,author) values ('标题3','内容一二三','李四'); 
select * from blogs
19. 修改config配置文件数据库名.修改路由blogjs用于测试接口
20. 开启服务器。修复语法错误。
21. get接口测试完成。
22. post接口测试