// 处理post流
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    // TODO: 此时只支持json格式，非该格式的请求体返回值为空对象的promise
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      // 没有传过来数据,返回空对象的promise值。
      if (!postData) {
        resolve({});
        return;
      }
      // 返回包含对象的promise值。
      resolve(JSON.parse(postData));
    })
  })
  return promise;
}

module.exports = getPostData;