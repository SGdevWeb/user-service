const test = require('./testDTO/testDTO');
const testPost = require('./testDTO/testPostDTO');
const testProfile = require('./testDTO/testPostProfileDTO');

const postOneExperience = require('./experienceDTO/postOneExperienceDTO');
const updateOneExperience = require('./experienceDTO/updateOneExperienceDTO');

const postOneSoft_skill = require('./soft_skillDTO/postOneSoft_skillDTO');
const updateOneSoft_skill = require('./soft_skillDTO/updateOneSoft_skillDTO');

const updateProfile = require('./userDTO/updateProfileDTO');

const loginDTO = require('./authDTO/loginDTO');
const signinDTO = require('./authDTO/signinDTO')

module.exports = {
    test,
    testPost,
    testProfile,
    postOneExperience,
    updateOneExperience,
    postOneSoft_skill,
    updateOneSoft_skill,
    updateProfile,
    loginDTO,
    signinDTO
}