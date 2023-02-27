const express = require('express');
const router = express.Router();
const DTO = require('../dto/dtos')

const userController = require('../controller/userController');

router.post('/signin', DTO.signinDTO, userController.signinController);

router.post('/login', DTO.loginDTO, userController.loginController);

router.get('/users', userController.getAllUsersController)

router.get('/profiles', userController.getAllProfileUsersController)

module.exports = router;