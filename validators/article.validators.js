const {z} = require('zod')

module.exports.createArticleSchema = z.object({
    titre: z.string(),
    description: z.string(),
    categorieId: z.int()
})

module.exports.updateArticleSchema = z.object({
    titre: z.string(),
    description: z.string(),
    categorieId: z.int()
})