const express = require('express');
const router = express.Router();
require('dotenv').config();
const userController = require('../controller/userController');
const DTO = require('../dto/dtos');

router.get('/userprofile/:uuid',userController.userProfileGetController);

router.post('/postoneexperience', DTO.postOneExperience, userController.postOneExperienceController);

router.post('/updateoneexperience', DTO.updateOneExperience, userController.updateOneExperienceController);

module.exports = router;