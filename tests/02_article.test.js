const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let token;
let userId;
let categorieId;

beforeAll(async () => {
  // Nettoyer la base avant les tests
  await prisma.article.deleteMany();
  // await prisma.categorie.deleteMany();
  await prisma.user.deleteMany();

  // Créer un utilisateur test
  await request(app)
    .post("/api/v1/user/register")
    .send({ nom: "test", email: "test@gmail.com", password: "1234" });

  // Authentification de l'utilisateur test
  const res = await request(app)
    .post("/api/v1/user/login")
    .send({ email: "test@gmail.com", password: "1234" });

  token = res.body.token;
  userId = res.body.data?.id || 1; // récupération de l'ID user
});

afterAll(async () => {
  await prisma.$disconnect(); 
});

describe("Tests de l'API article", () => {
  test("POST /api/v1/article -> refuse sans token", async () => {
    const res = await request(app).post("/api/v1/article").send({
      titre: "Mon premier article",
      description: "Ceci est le contenu de mon premier article.",
      userId: userId,
      categorieId: 1,
    });

    expect(res.statusCode).toBe(403);
  });

  test("POST /api/v1/article -> autorisé avec token", async () => {
    // Création d'une catégorie avant de créer l'article
    const categorieRes = await request(app)
      .post("/api/v1/categorie")
      .set("Authorization", `Bearer ${token}`)
      .send({ nom: "Tech" });

    categorieId = categorieRes.body.data?.id || 1;

    // Création d'un article
    const res = await request(app)
      .post("/api/v1/article")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titre: "Mon premier article",
        description: "Ceci est le contenu de mon premier article.",
        userId: userId,
        categorieId: categorieId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.titre).toBe("Mon premier article");
  });

  test("GET /api/v1/article -> récupère les articles", async () => {
    const res = await request(app)
      .get("/api/v1/article")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
