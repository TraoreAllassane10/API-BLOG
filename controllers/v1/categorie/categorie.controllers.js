const categorieService = require("../../../services/v1/categorie/categorie.services");
const categorieValidators = require("../../../validators/categorie.validators");

// Liste des categories
module.exports.all = async (req, res) => {
  // Recupération des catégories
  const categories = await categorieService.getCategories();

  return res.status(200).json({
    success: true,
    message: "Liste des catégories",
    data: categories,
  });
};

// Recuperation d'une categorie
module.exports.find = async (req, res) => {
  const { id } = req.params;

  // Recupération d'une categorie
  const categorie = await categorieService.getCategory(id);

  if (!categorie) {
    return res.status(404).json({
      success: false,
      message: "Categorie introuvable",
    });
  }

  res.status(200).json({
    success: true,
    message: "Une catégorie trouvée",
    data: categorie,
  });
};

// Création d'une categorie
module.exports.create = async (req, res) => {
  // Validation des entrées
  const data = categorieValidators.createCategorieSchema.parse(req.body);

  // Création d'une catégorie
  const categorie = await categorieService.createCategory(data);

  res.status(200).json({
    success: true,
    message: "Catégorie créée",
    data: categorie,
  });
};

// Modification d'une catégorie
module.exports.update = async (req, res) => {
  const { id } = req.params;

  //VAlidation des entrées
  const data = categorieValidators.updateCategorieSchema.parse(req.body);

  // Recuperation de la catégorie à modifier
  const categorie = await categorieService.getCategory(id);

  // Si rien trouvée
  if (!categorie) {
    return res.status(404).json({
      success: false,
      message: "Categorie introuvable",
    });
  }

  // Modification de la categorie
  const categorieModifiee = await categorieService.updateCategory(
    categorie.id,
    data
  );

  res.status(200).json({
    success: true,
    message: "Catégorie modifiée",
    data: categorieModifiee,
  });
};

// Suppression d'une categorie
module.exports.destroy = async (req, res) => {
  const { id } = req.params;

  // Recuperation de la catégorie à modifier
  const categorie = await categorieService.getCategory(id);

  // Si rien trouvée
  if (!categorie) {
    return res.status(404).json({
      success: false,
      message: "Categorie introuvable",
    });
  }

  // Suppression d'une catégorie
  await categorieService.deleteCategory(id);

  res.status(200).json({
    success: true,
    message: "Catégorie supprimée",
  });
};
