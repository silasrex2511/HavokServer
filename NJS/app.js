var http = require('http').createServer(handler)
var io = require('socket.io')(http);
var fs = require('fs');

function handler (req, res) {
  fs.readFile(__dirname + '/../Main/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function(socket){
  console.log("a user connected");
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8000);
console.log("listening on port 8000");
