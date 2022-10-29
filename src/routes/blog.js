const handleBlogRoute = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];

  if (method === 'GET' && path === '/api/blog/list') {
    return {
      message: "get success"
    }
  }
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      message: "post success"
    }
  }

}

module.exports = handleBlogRoute;