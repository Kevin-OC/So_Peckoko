// import
const express = require('express');
const router = express.Router();

// logique métier & middleware
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/password-validator');

// nos routes de création d'user & de login
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

// export
module.exports = router;