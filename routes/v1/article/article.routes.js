const express = require("express")
const router = express.Router()
const articleControllers = require('../../../controllers/v1/article/article.controllers')

router.get('/',  articleControllers.all);
router.post('/', articleControllers.create);
router.get('/:id',  articleControllers.find);
router.put('/:id',  articleControllers.update);
router.delete('/:id', articleControllers.destroy);

module.exports = router;