const handleBlogRoute = require('./src/routes/blog');
const serverHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const blogData = handleBlogRoute(req, res);

  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('404 Not Found');
  res.end();
}

module.exports = serverHandler;
