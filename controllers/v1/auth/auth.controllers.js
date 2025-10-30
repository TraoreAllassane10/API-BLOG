const authServices = require("../../../services/v1/auth/auth.services");
const userValidators = require("../../../validators/user.validators");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.register = async (req, res) => {
  try {
    // Validation des entrées
    const data = userValidators.userRegisterSchema.parse(req.body);

    // Verifie si cet utilisateur existe
    const utilisateurExiste = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (utilisateurExiste) {
      return res.status(400).json({
        success: false,
        message: "Cet utilisateur existe déjà",
      });
    }

    //Inscription de l'utilisateur
    const user = authServices.register(data);

    res.status(201).json({
      success: true,
      message: "Utilisateur crée",
      data: user,
    });
  } catch (error) {
    //erreur de validation
    if (error.name === "ZodError") {
      return res.status(500).json({
        success: false,
        message: "Erreur de validation",
        errors: error.message,
      });
    }

    //erreur serveur
    return res.status(500).json({
      success: false,
      message: "Erreur survenue au niveau du serveur",
      errors: error,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    //Validation des entrées
    const data = userValidators.userLoginSchema.parse(req.body);

    // Connection de l'utilisateur
    const { user, token } = await authServices.login(data);
  
    // Si email ou mot de passe incorrect
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }

    res.status(200).json({
      success: true,
      message: "Utilisateur connecté",
      token,
      data: user,
    });
  } catch (error) {
    //erreur de validation
    if (error.name === "ZodError") {
      return res.status(500).json({
        success: false,
        message: "Erreur de validation",
        errors: error.message,
      });
    }

    //erreur serveur
    return res.status(500).json({
      success: false,
      message: "Erreur survenue au niveau du serveur",
      errors: error,
    });
  }
};
