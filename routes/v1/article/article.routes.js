const express = require("express");
const router = express.Router();
const articleControllers = require("../../../controllers/v1/article/article.controllers");
const authMiddleware = require("../../../middlewares/auth.Middleware");

router.get("/", authMiddleware, articleControllers.all);
router.post("/", authMiddleware, articleControllers.create);
router.get("/:id", authMiddleware, articleControllers.find);
router.put("/:id", authMiddleware, articleControllers.update);
router.delete("/:id", authMiddleware, articleControllers.destroy);

module.exports = router;
