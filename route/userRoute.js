const express = require('express');
const router = express.Router();
require('dotenv').config();
const userController = require('../controller/userController');
const validator = require('../middleware/testMiddleware');
const DTO = require('../dto/dtos');

router.get('/testpostprofile/user',userController.userProfileGetController);