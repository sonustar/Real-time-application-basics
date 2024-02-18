const {Server} = require("socket.io")
const express = require("express")

//http protocol banalam : work -> so that we can create a http server 
const {createServer} = require("node:http")

//I will be connect a html file so we need a module : 
const {join} = require("node:path");



//express instance : app a 
const app = express();
const server =  createServer(app) //we use the http server to handle our request and response cycle
const io = new Server(server) //  Create a Socket.IO server by passing the HTTP server instance



//connecting my page !! 
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

//Home route : 
app.get('/',(req,res)=>{
    res.send("hello world")
});

// Server side code :
//on-> we are creating a connection 
// io.on("connection",(socket)=>{
//     // console.log("a user connected");
//     //client side :
    
//     //recieve  data from client side : 
//     socket.on('chat message', (msg) =>{
//         io.emit('chat message', msg); // emit is used to send event to all clients , except sender
//         console.log('message  ' + msg);
//     });
     
//     //  socket.on('disconnect', () => {
//     //     console.log('user disconnected');
//     //   });
// })

// io.emit('chat message', { sender: 'Server', message: 'Hello, everyone!' });

io.on("connection", (socket) => {
    console.log("A user connected");
    
    // Send a welcome message to the newly connected client
    socket.emit('chat message', { sender: 'Server', message: 'Hello, you are connected!' });
    
    // Handle incoming chat messages from the client
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Emit the message to all connected clients
        console.log('Received message: ' + msg);
    });
});

// Listening port 
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });