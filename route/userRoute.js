const express = require('express');
const router = express.Router();
require('dotenv').config();
const userController = require('../controller/userController');
const DTO = require('../dto/dtos');

router.get('/userprofile/:uuid',userController.userProfileGetController);

router.post('/postoneexperience', DTO.postOneExperience, userController.postOneExperienceController);

router.post('/updateoneexperience', DTO.updateOneExperience, userController.updateOneExperienceController);

router.post('/postonesoft_skill', DTO.postOneSoft_skill, userController.postOneSoft_skillController);

router.post('/updateonesoft_skill', DTO.updateOneSoft_skill, userController.updateOneSoft_skillController);

module.exports = router;