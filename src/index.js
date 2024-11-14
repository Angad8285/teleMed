const path = require('path');
const http = require('http')
const socketio = require('socket.io')
const express = require("express")
require('./db/mongoose')
require('dotenv').config({ path: './config/dev.env' })
const userRouter = require("./routers/user")
const doctorRouter = require("./routers/doctor")
const chatRouter = require("./routers/chat")
const medicineRouter = require("./routers/medicine")


const app = express();
const server = http.createServer(app)
const io = socketio(server)


const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter)
app.use(doctorRouter)
app.use(chatRouter)
app.use(medicineRouter)

//socket.io connection event
io.on('connection', (socket) => {
  console.log('New Websocket connection');

  //join a room based on consultation ID
  socket.on('joinRoom', ({ consultationId, user }) => {
    console.log(`Joining Room: ${consultationId} as User: ${user}`);
    socket.join(consultationId);

    socket.broadcast.to(consultationId).emit('message',{ sender : 'Admin', content : `${user} has joined!`, timestamp: new Date()})

    console.log(`User joined room: ${consultationId}`);
  });

  socket.on('connect_error', (error) => {
    console.error('Connection Error:', error);
  });

  // Handle sending and broadcasting messages
  socket.on('sendMessage', ({ consultationId, sender, content }) => {
    console.log(content)
    socket.broadcast.to(consultationId).emit('message', { sender, content, timestamp: new Date() });
  });

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected due to:', reason);
  });

})

server.listen(port, () => {
  console.log('Server is up on port ' + port)
})