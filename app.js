const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')

const authRoutes = require('./routes/v1/auth/auth.routes')

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Le routage de l'authentification
app.use("/user", authRoutes);

module.exports = app;