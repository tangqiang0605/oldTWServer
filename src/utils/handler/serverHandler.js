const querystring = require('querystring');
const handleBlogRoute = require('../../routes');
const noPage=require('../../config/noPage')
const getPostData = require('./handlePostData');

const serverHandler = async (req, res) => {
  // req数据处理
  res.setHeader('Content-Type', 'application/json');
  req.path = req.url.split('?')[0];
  req.query = querystring.parse(req.url.split('?')[1]);
  req.isGet = req.method === 'GET' ? 1 : 0;
  req.isPost = req.method === 'POST' ? 1 : 0;
  req.body = req.isPost ? await getPostData(req) : {};
  // 路由匹配。存在返回成功或失败promise，不存在返回undefined。
  const blogData = await handleBlogRoute(req, res);
  if (blogData) {
      res.end(JSON.stringify(blogData));
    return;
  }
  noPage(res);
}

module.exports = serverHandler;
