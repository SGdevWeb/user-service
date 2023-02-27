const express = require('express');
const router = express.Router();
const DTO = require('../dto/dtos')

const userController = require('../controller/userController');

router.post('/signin', DTO.signinDTO, userController.signin);

router.post('/login', DTO.loginDTO, userController.login);

router.get('/users', userController.getAllUsers)

module.exports = router;