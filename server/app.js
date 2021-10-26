if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = 4000
const routes = require('./routes')
const cors = require('cors')
const errHandler = require("./middlewares/errHandler");


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes);
app.use(errHandler)
if (process.env.NODE_ENV == 'test') module.exports = app
else {
  /* istanbul ignore next */
  server.listen(PORT, () => {
    console.log(`this app is listening to http://localhost:${PORT}`)
  })
}
