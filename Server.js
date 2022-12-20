const express  = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const port = 3000
var http = require('http').createServer(app);
const io = require('socket.io')(http, {cors: {orgin: "*", methods:["GET", "POST"]}})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/', routes)

http.listen(port,() => console.log('Server ready'));




