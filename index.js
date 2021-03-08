const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors:{
        origin: "*",
    }
});
let cors = require('cors');
const activeSockets=[];
app.use(cors({
    origin: '*'
}));



io.on('connection', (socket) => {
   activeSockets.push(socket); 
  socket.on("message",(msg)=>{

    
    activeSockets.forEach(a=>{
        a.emit('message',msg);
    });


  })
  socket.on("disconnect",()=>{console.log("user disconnected!");})
});
console.log('here it goes')

http.listen(3000, () => {
  console.log('listening on *:3000');
});
