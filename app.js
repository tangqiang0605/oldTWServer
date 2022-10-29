const handleBlogRoute = require('./src/routes/blog');
const querystring = require('querystring');
// const url=require('url')

// 处理post流
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    // TODO: 此时只支持json格式
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      // 没有传过来数据
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    })
  })
  return promise;
}

const serverHandler = (req, res) => {

  // req数据处理
  res.setHeader('Content-Type', 'application/json');
  req.path = req.url.split('?')[0];
  req.query = querystring.parse(req.url.split('?')[1]);

  // TODO：处理post流是一个异步过程，其实可以加个if根据是不是post来分别执行。get直接不在意post的body了
  getPostData(req).then((postData) => {
    req.body = postData;
    const blogData = handleBlogRoute(req, res);
    // 请求成功
    if (blogData) {
      blogData.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }
    // TODO：请求失败是否有这个必要，不确定失败时blogData里面是什么
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  })

}

module.exports = serverHandler;
