const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Liste des categories
module.exports.getCategories = async () => {
  const categories = await prisma.categorie.findMany();
  return categories;
};

// Création d'une categorie
module.exports.createCategory = async (data) => {
  const { nom } = data;

  //Creation d'une categorie
  const categorie = await prisma.categorie.create({
    data: { nom },
  });

  return { id: categorie.id, nom: categorie.nom };
};

// Recuperation d'une categorie
module.exports.getCategory = async (id) => {
  let categorieId = Number(id);

  const categorie = await prisma.categorie.findFirst({
    where: { id: categorieId },
  });

  if (categorie) {
    return { id: categorie.id, nom: categorie.nom };
  }
};

// Modification d'une catégorie
module.exports.updateCategory = async (id, data) => {
  // Coversion de l'id en entier
  let categorieId = Number(id);

  const { nom } = data;

  const categorie = await prisma.categorie.update({
    where: { id: categorieId },
    data: { nom },
  });

  return { id: categorie.id, nom: categorie.nom };
};

// Suppression d'une categorie
module.exports.deleteCategory = async (id) => {
  // Coversion de l'id en entier
  let categorieId = Number(id);

  const categorie = await prisma.categorie.delete({
    where: { id: categorieId },
  });

  if (categorie) {
    return { id: categorie.id, nom: categorie.nom };
  }

};
