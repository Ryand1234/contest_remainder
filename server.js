require('dotenv').config();
var http = require('http');
var { checkForContest } = require('./contests');

console.log("Service Starts")
checkForContest();
http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT||3000)