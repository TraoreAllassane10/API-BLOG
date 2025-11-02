const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')

//Immportation des bibliothèques de swagger
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const authRoutes = require('./routes/v1/auth/auth.routes')
const categorieRoutes = require("./routes/v1/categorie/categorie.routes")
const articleRoutes = require("./routes/v1/article/article.routes")

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuration de swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API BLOG',
            version: '1.0.0',
            description: "Documentation de l'API BLOG"
        },
        server: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },

    apis: ['./routes/**/*.js'] // Chemin vers les fichiers de routes que je documente
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

//Route de la documentation 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Le routage de l'authentification
app.use("/api/v1/user", authRoutes);
app.use('/api/v1/categorie', categorieRoutes)
app.use('/api/v1/article', articleRoutes);

module.exports = app;