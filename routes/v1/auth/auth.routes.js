const express = require("express")
const router = express.Router()
const authContollers = require('../../../controllers/v1/auth/auth.controllers')

router.post('/v1/register', authContollers.register);
router.post('/v1/login', authContollers.login);

module.exports = router;