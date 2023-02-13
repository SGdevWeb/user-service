const express = require('express');
const router = express.Router();
require('dotenv').config();
const testController = require('../controller/testController');
const validator = require('../middleware/testMiddleware');
const DTO = require('../dto/dtos');

router.get('/test', DTO.test, testController.testController );

router.post('/testpost',DTO.testPost, testController.testpostController);

router.post('/testpostprofile',DTO.testProfile, testController.testPostProfile);

module.exports = router

