const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Liste des articles
module.exports.getArticles = async () => {
  const articles = await prisma.article.findMany();

  return articles;
};

// Création d'un article
module.exports.createArticle = async (data) => {
  const { titre, description, categorieId } = data;

  //creation d'un article
  const article = await prisma.article.create({
    data: {
      titre,
      description,
      userId: 1,
      categorieId,
    },
  });

  return {
    id: article.id,
    titre: article.titre,
    description: article.description,
    date: article.date,
    userId: article.userId,
    categorieId: article.categorieId,
  };
};

// Recuperation d'un article
module.exports.getArticle = async (id) => {
  // Coversion de l'id en entier
  let articleId = Number(id);

  const article = await prisma.article.findFirst({
    where: { id: articleId },
  });

  if (article) {
    return {
      id: article.id,
      titre: article.titre,
      description: article.description,
      date: article.date,
      userId: article.userId,
      categorieId: article.categorieId,
    };
  }
};

// Modification d'un article
module.exports.updateArticle = async (id, data) => {
  // Coversion de l'id en entier
  let articleId = Number(id);

  const { titre, description, categorieId } = data;

  const article = await prisma.article.update({
    where: { id: articleId },
    data: {
      titre,
      description,
      userId: 1,
      categorieId,
    },
  });

  return {
    id: article.id,
    titre: article.titre,
    description: article.description,
    date: article.date,
    userId: article.userId,
    categorieId: article.categorieId,
  };
};

// Suppression d'un article
module.exports.deleteArticle = async (id) => {
  // Coversion de l'id en entier
  let articleId = Number(id);

  const article = await prisma.article.delete({
    where: {id: articleId}
  })

   if (article) {
    return {
      id: article.id,
      titre: article.titre,
      description: article.description,
      date: article.date,
      userId: article.userId,
      categorieId: article.categorieId,
    };
  }
};
