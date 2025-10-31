const request = require("supertest");
const app = require('../app')
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

let token;

beforeAll(async () => {
    // await prisma.user.deleteMany();
    // await prisma.categorie.deleteMany();
    // await prisma.article.deleteMany();

    //Créer un utilisateur test et récuperer un token
    await request(app).post('/api/v1/user/register').send({nom: "test", email: "test@gmail.com", password: "1234"});

    // Authentification de l'utilisateur test
    const res = await request(app).post('/api/v1/user/login').send({nom: "test", email: "test@gmail.com", password: "1234"});

    // Stockage du token dans une variable
    token = res.body.token;
});

afterAll(async () => {
    await prisma.$disconnect();
});

console.log(token)

const getToken = async () => token;


module.exports = {token, app, prisma, getToken};
