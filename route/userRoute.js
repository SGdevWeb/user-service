const express = require('express');
const router = express.Router();
require('dotenv').config();
const userController = require('../controller/userController');
const validator = require('../middleware/userMiddleware');
const DTO = require('../dto/dtos');

router.get('/userprofile/:uuid',userController.userProfileGetController);

module.exports = router;