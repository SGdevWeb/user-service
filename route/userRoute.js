const express = require('express');
const router = express.Router();
require('dotenv').config();
const controller = require('../controller/controllers');
const DTO = require('../dto/dtos');

//router.get('/userprofile/:uuid',controller.user.userProfileGetController);

router.post('/postoneexperience', DTO.postOneExperience, controller.experience.postOneExperienceController);

router.post('/updateoneexperience', DTO.updateOneExperience, controller.experience.updateOneExperienceController);

router.post('/deleteoneexperience', DTO.deleteOneExperience, controller.experience.deleteOneExperienceController)

router.post('/postonesoft_skill', DTO.postOneSoft_skill, controller.soft_skill.postOneSoft_skillController);

router.post('/updateonesoft_skill', DTO.updateOneSoft_skill, controller.soft_skill.updateOneSoft_skillController);

router.post('/deleteonesoft_skill', DTO.deletteOneSoft_skill, controller.soft_skill.deleteOneSoft_skillController);

//router.post('/updateprofile', DTO.updateProfile, controller.user.updateProfile);

router.get("/userprofile/:uuid",controller.user.userProfileGetController);

router.post('/signin', DTO.signinDTO, controller.auth.signinController);

router.post('/login', DTO.loginDTO, controller.auth.loginController);

router.get('/users', controller.auth.getAllUsersController)

router.get('/profiles', controller.auth.getAllProfileUsersController)


module.exports = router;