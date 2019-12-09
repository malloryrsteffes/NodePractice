// import HTTP
const http = require("http");

// import routes
const routes = require("./routes");

// Create Server callback function
const server = http.createServer(routes);

// Open server on specified port
server.listen(3000);