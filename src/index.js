const path = require('path');
const http = require('http')
const socketio = require('socket.io')
const express = require("express")
require('./db/mongoose')
require('dotenv').config({ path: './config/dev.env' })
const userRouter = require("./routers/user")
const doctorRouter = require("./routers/doctor")
const consultationRouter = require("./routers/consultation")
const medicineRouter = require("./routers/medicine")
const jwt = require('jsonwebtoken')
const cors = require('cors');


const app = express();
const server = http.createServer(app)
const io = socketio(server)

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Replace '*' with your frontend URL in production, e.g., 'https://yourdomain.com'
}));

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter)
app.use(doctorRouter)
app.use(consultationRouter)
app.use(medicineRouter)

//socket.io connection event
io.on('connection', (socket) => {
  console.log('New Websocket connection');

  //join a room based on consultation ID
  socket.on('joinRoom', async ({ token, consultationId, user }, callback) => {

    try {
      //verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { role, _id } = decoded
      if (consultationId != null) {
        socket.join(consultationId)
      }

      //send role back to client
      callback({ role })

      socket.broadcast.to(consultationId).emit('message', { sender: 'Admin', content: `${role} has joined!`, timestamp: new Date() })

      console.log(`Joining Room: ${consultationId} as User: ${user}`);

    } catch (e) {
      callback({ error: 'Invalid Token' })
    }

  });

  socket.on('connect_error', (error) => {
    console.error('Connection Error:', error);
  });

  // Handle sending and broadcasting messages
  socket.on('sendMessage', ({ consultationId, sender, content }) => {
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