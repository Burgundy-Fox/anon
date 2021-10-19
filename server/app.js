if (process.env.NODE_ENV != 'production') require('dotenv').config()
const express = require('express')
const app = express()
const server = require("http").createServer(app);
const PORT = 4000
const cors = require('cors')
const UserController = require('./controllers/UserController')
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/register', UserController.register)
app.post('/login', UserController.login)
app.patch('/user/:id', UserController.updateAvatar)

// io.on("connection", socket => {
//   console.log(socket.id);
//   console.log('a user has connected')
//   socket.on("chat message", msg => {
//     console.log(msg);
//     io.emit("chat message", msg);
//   });
// });

if (process.env.NODE_ENV == 'test') module.exports = app
else {
  server.listen(PORT, () => {
    console.log(`this app is listening to http://localhost:${PORT}`)
  })
}