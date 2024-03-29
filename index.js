require("dotenv").config();
const express = require('express')
const dbConnection = require("./config/dbConnection.js")
const routes = require("./routes");
var cors = require('cors')
const app = express()
const path = require('path')

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
dbConnection()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(routes);


// mongodb+srv://oreby:wOFhvtceMrbnrSxn@cluster0.1gr85au.mongodb.net/oreby?retryWrites=true&w=majority

app.listen(8000)