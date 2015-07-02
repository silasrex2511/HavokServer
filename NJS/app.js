var http = require('http').createServer(handler)
var io = require('socket.io')(http);
var fs = require('fs');
var mime = require('mime');


function handler (req, res) {
  if(req.url !== "/favicon.ico"){
    base = __dirname + "/../Main"+ req.url;
  }else{
    base = __dirname + req.url;
  }
  fs.readFile(base,function (err, data) {
    if (!err) {
      res.writeHead(200,{"content-type":mime.lookup(req.url)});
      res.end(data);
    }else{
      res.writeHead(500);
      return res.end('Error loading index.html\n' + base);
      console.log(base);
    }
  });
}

//will be moved to a separate module
io.on('connection', function(socket){
  console.log("a user connected");
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8000);
console.log("listening on port 8000");
