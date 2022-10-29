const http = require('http');
const serverHandler = require('./src/utils/handler/serverHandler');
const { PORT } = require('./src/config/webServer');
const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`)
})