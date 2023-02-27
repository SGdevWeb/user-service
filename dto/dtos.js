const test = require('./testDTO/testDTO');
const testPost = require('./testDTO/testPostDTO');
const testProfile = require('./testDTO/testPostProfileDTO');

const postOneExperience = require('./experienceDTO/postOneExperienceDTO');
const updateOneExperience = require('./experienceDTO/updateOneExperienceDTO');

const postOneSoft_skill = require('./soft_skillDTO/postOneSoft_skillDTO');
const updateOneSoft_skill = require('./soft_skillDTO/updateOneSoft_skillDTO');

const updateProfile = require('./userDTO/updateProfileDTO');
const test = require('./testDTO');
const testPost = require('./testPostDTO');
const testProfile = require('./testPostProfileDTO');
const loginDTO = require('./loginDTO');
const signinDTO = require('./signinDTO')

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