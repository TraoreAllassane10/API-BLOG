const express = require("express")
const router = express.Router()
const categorieContollers = require('../../../controllers/v1/categorie/categorie.controllers')

router.get('/', categorieContollers.all);
router.post('/', categorieContollers.create);
router.get('/:id', categorieContollers.find);
router.put('/:id', categorieContollers.update);
router.delete('/:id', categorieContollers.destroy);

module.exports = router;