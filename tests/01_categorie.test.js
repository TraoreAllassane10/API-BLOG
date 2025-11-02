const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let token;

beforeAll(async () => {
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();
  await prisma.categorie.deleteMany();

  //Créer un utilisateur test et récuperer un token
  await request(app)
    .post("/api/v1/user/register")
    .send({ nom: "test", email: "test@gmail.com", password: "1234" });

  // Authentification de l'utilisateur test
  const res = await request(app)
    .post("/api/v1/user/login")
    .send({ nom: "test", email: "test@gmail.com", password: "1234" });

  // Stockage du token dans une variable
  token = res.body.token;
});

describe("Tests de l'API categorie", () => {
    // Test de création de categorie sans token
  test("POST /api/v1/categorie -> refuse sans token", async () => {
    const res = await request(app)
      .post("/api/v1/categorie")
      .send({ nom: "Express" });

    expect(res.statusCode).toBe(403);
  });

  // Test de création de categorie avec token
  test("POST /api/v1/categorie -> authorisé avec token", async () => {
    const res = await request(app)
      .post("/api/v1/categorie")
      .set("Authorization", `Bearer ${token}`)
      .send({ nom: "Express" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.nom).toBe("Express");
  });

    // Test de récupération des catégories avec token
  test("Get /api/v1/categorie -> Recupére les catégories", async () => {
    const res = await request(app)
      .get("/api/v1/categorie")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBeGreaterThan(0)
  });
});
