var Client = require('./model/Client');

var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./public'));
app.set('view engine','ejs');

var clints = new Array(); 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/admin',(req,res,nxt)=>{
  res.render('server',{clients:clints});
})
io.on('connection', function(socket){
 
  socket.on('clientHere',(message)=>{
    var clnt = new Client(socket.id,message);
    clints.push(clnt);
    io.sockets.emit('tellAdmin',clnt);
  });
  socket.on('clientMssg',(message)=>{
    var crntClient = clints.filter((clients)=>{
       return clients.id === socket.id;
    });
    crntClient.message += message;
    console.log(crntClient.message);
    io.sockets.emit('newMssg',socket.id);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
