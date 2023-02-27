const express = require('express');
const router = express.Router();
require('dotenv').config();
const controller = require('../controller/controllers');
const DTO = require('../dto/dtos');

router.get('/userprofile/:uuid',controller.user.userProfileGetController);

router.post('/postoneexperience', DTO.postOneExperience, controller.experience.postOneExperienceController);

router.post('/updateoneexperience', DTO.updateOneExperience, controller.experience.updateOneExperienceController);

router.post('/postonesoft_skill', DTO.postOneSoft_skill, controller.soft_skill.postOneSoft_skillController);

router.post('/updateonesoft_skill', DTO.updateOneSoft_skill, controller.soft_skill.updateOneSoft_skillController);

router.post('/updateprofile', DTO.updateProfile, controller.user.updateProfile);

router.get("/:id",controller.user.getUserById);


module.exports = router;