const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')

const authMiddleware = require('./middlewares/auth.Middleware')
const authRoutes = require('./routes/v1/auth/auth.routes')
const categorieRoutes = require("./routes/v1/categorie/categorie.routes")
const articleRoutes = require("./routes/v1/article/article.routes")

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Le routage de l'authentification
app.use("/api/v1/user", authRoutes);
app.use('/api/v1/categorie', categorieRoutes)
app.use('/api/v1/article', articleRoutes);

module.exports = app;