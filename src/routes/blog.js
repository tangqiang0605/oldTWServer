const { SuccessModel } = require("../model/responseModel");
const { getList, getDetail,insertData} = require('../controllers/blog')

const handleBlogRoute = (req, res) => {
  const { method, path, requry, body } = req;

  // 接口一
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.context || '';

    const listData = getList(author, keyword);
    return listData.then(listData => {
      return new SuccessMOdel(listData);
    });
  }

  if (method === 'GET' && path === '/api/getdetail') {
    return getDetail(1).then(res => new SuccessModel(res));
  }

  if (method === 'POST' && path === '/api/new') {
    return insertData({ title: body.title, context: body.context, author: body.author }).then(res=>new SuccessModel(res));
  }
}

module.exports = handleBlogRoute;