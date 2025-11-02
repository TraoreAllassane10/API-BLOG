const express = require("express");
const router = express.Router();
const articleControllers = require("../../../controllers/v1/article/article.controllers");
const authMiddleware = require("../../../middlewares/auth.Middleware");

/**
 * @swagger 
 *  /article
 *    get: 
 *     summary: Récupérer tous les articles
 *     tags: [Article]
 *     response: 
 *       200:
 *         description: Liste des articles
 *         content: 
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id: 
 *                          type: integer 
 *                          example: 1
 *                      titre: 
 *                           type: string
 *                           example: "Mon premier article" 
 *                      description:
 *                           type: string
 *                            example: "Ceci est la description de mon premier article"
 *               
 * 
 */

router.get("/", authMiddleware, articleControllers.all);
router.post("/", authMiddleware, articleControllers.create);
router.get("/:id", authMiddleware, articleControllers.find);
router.put("/:id", authMiddleware, articleControllers.update);
router.delete("/:id", authMiddleware, articleControllers.destroy);

module.exports = router;
