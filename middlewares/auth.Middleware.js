
module.exports.authMiddleware = (req, res, next) => {
    const authHeaders = req.headers['Authorization'];
    const token = authHeaders && authHeaders['token'].split(" ")[1]

    if (!token) return res.status(403).json({
        success: false,
        message: "Vous n'etes pas authoriser à accéder à cette route"
    });

    next()
}