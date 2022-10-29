const { SuccessModel, ErrorModel } = require("../utils/model/responseModel");
const { bloghandler } = require('../controllers')

const handleBlogRoute = (req, res) => {
  const { path, query, body, isGet, isPost } = req;

  // 接口实例。我们只需要确认请求方式、请求的地址、引用我们的handler函数，以及成功或失败的回调即可。
  // if (映射关系) {
  //   查询语句的参数处理（一般不需要处理或者处理数据为空的情况）get的参数对象为query，post的参数对象为body。
  //   return handler函数(查询语句的参数).then(res => {
  //     res：查询结果
  //     根据查询结果返回SuccessModel或ErrorModel
  //     接受两个参数data和message
  //   })
  // }

  if (isGet && path === '/api/getdetail') {
    return bloghandler.getDetail(query.id).then(res => {
      if (res.length) {
        return new SuccessModel(res);
      }
      return new ErrorModel('该用户不存在');
    });
  }

  if (isPost && path === '/api/new') {
    return bloghandler.insertData({ title: body.title, context: body.context, author: body.author }).then(res => new SuccessModel(res));
  }
}

module.exports = handleBlogRoute;