const express = require("express")
const router = express.Router()
const authContollers = require('../../../controllers/v1/auth/auth.controllers')

router.post('/register',authContollers.register);
router.post('/login', authContollers.login);

module.exports = router;