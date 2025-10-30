const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports.register = async (data) => {
  //Destructuration des entrées
  const { nom, email, password } = data;

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Enregistrement de l'utilisateur
  const user = await prisma.user.create({
    data: {
      nom,
      email,
      password: hashedPassword,
    },
  });

  return { id: user.id, nom: user.nom, email: user.email };
};

module.exports.login = async (data) => {
  //Destructuration des entrées
  const { email, password } = data;

  // Verifie si utilisateur existe
  const utilisateurExiste = await prisma.user.findFirst({ where: { email } });

  if (utilisateurExiste) {
    // Verifie si password est correct
    const MotDePasseValide = await bcrypt.compare(
      password,
      utilisateurExiste.password
    );

    if (MotDePasseValide) {
      // Crée le token
      const token = await jwt.sign(
        { utilisateurExiste },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
     
      return {
        user: {
          id: utilisateurExiste.id,
          nom: utilisateurExiste.nom,
          email: utilisateurExiste.email,
        },
        token,
      };
    }
  }
};
