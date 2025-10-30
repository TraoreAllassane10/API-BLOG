const {z} = require("zod")

module.exports.createCategorieSchema = z.object({
    nom: z.string()
});

module.exports.updateCategorieSchema = z.object({
    nom: z.string()
})