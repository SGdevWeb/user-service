const express = require('express');
const router = express.Router();
require('dotenv').config();
const testController = require('../controller/testController');
const testDTO = require('../dto/testDTO');

router.get('/test', testDTO.testDTO, testController.testController );

router.post('/testpost',testDTO.testPostDTO, testController.testpostController);

module.exports = router

