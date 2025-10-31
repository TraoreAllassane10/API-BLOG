const articleServices = require("../../../services/v1/article/article.services");
const articleValidators = require("../../../validators/article.validators");

//Liste des articles
module.exports.all = async (req, res) => {
  //Recuperation des catégorie
  const articles = await articleServices.getArticles();

  return res.status(200).json({
    success: true,
    message: "Liste des articles",
    data: articles,
  });
};

// Creation d'un article
module.exports.create = async (req, res) => {
  // Validation des entréés
  const data = articleValidators.createArticleSchema.parse(req.body);

  // Création d'un article
  const article = await articleServices.createArticle(data);

  res.status(200).json({
    success: true,
    message: "Article crée",
    data: article,
  });
};

// Recuperation d'un article
module.exports.find = async (req, res) => {
  const { id } = req.params;

  // Recupération d'un article
  const article = await articleServices.getArticle(id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article introuvable",
    });
  }

  res.status(200).json({
    success: true,
    message: "Un article trouvé",
    data: article,
  });
};

// Modification d'un article
module.exports.update = async (req, res) => {
  const { id } = req.params;

  //Validation des entrées
  const data = articleValidators.updateArticleSchema.parse(req.body);

  // Recuperation de l'article à modifier
  const article = await articleServices.getArticle(id);

  // Si rien trouvée
  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article introuvable",
    });
  }

  const articleModifie = await articleServices.updateArticle(id, data);

  res.status(200).json({
    success: true,
    message: "Article modifié",
    data: articleModifie,
  });
};

// Suppression d'un article
module.exports.destroy = async (req, res) => {
  const { id } = req.params;

  // Recuperation de l'article à modifier
  const article = await articleServices.getArticle(id);

  // Si rien trouvée
  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article introuvable",
    });
  }

  // Suppression d'une catégorie
  await articleServices.deleteArticle(id);

  res.status(200).json({
    success: true,
    message: "Article supprimé",
  });
};
