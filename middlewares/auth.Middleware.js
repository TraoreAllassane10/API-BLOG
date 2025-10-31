const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token)
    return res.status(403).json({
      success: false,
      message: "Accès non authorisé ! Token manquant.",
    });

  try {
    // Decodage du token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Envoie de l'utilisateur connecté à la requete
    req.user = decode;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token maquant non invalid ou expiré" });
  }
};

module.exports = authMiddleware;