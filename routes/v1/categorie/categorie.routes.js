const express = require("express")
const router = express.Router()
const categorieContollers = require('../../../controllers/v1/categorie/categorie.controllers')
const authMiddleware = require('../../../middlewares/auth.Middleware')

router.get('/', authMiddleware, categorieContollers.all);
router.post('/', authMiddleware, categorieContollers.create);
router.get('/:id', authMiddleware, categorieContollers.find);
router.put('/:id', authMiddleware, categorieContollers.update);
router.delete('/:id', authMiddleware, categorieContollers.destroy);

module.exports = router;