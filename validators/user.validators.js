const {z} = require('zod')

//Validation des entrées lors de l'inscription
module.exports.userRegisterSchema = z.object({
    nom: z.string(),
    email: z.email(),
    password: z.string()
});

//Validation des entrées lors de la connexion
module.exports.userLoginSchema = z.object({
    email: z.email(),
    password: z.string()
});