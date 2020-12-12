var http = require('http');
var port = 	process.env.PORT || 3000;

console.log("Console window");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1>Hello</h1>");
  res.write("Success!");

  res.end();
}).listen(port);