<<<<<<< HEAD
const test = require('./testDTO/testDTO');
const testPost = require('./testDTO/testPostDTO');
const testProfile = require('./testDTO/testPostProfileDTO');

const postOneExperience = require('./experienceDTO/postOneExperienceDTO');
const updateOneExperience = require('./experienceDTO/updateOneExperienceDTO');
const deleteOneExperience = require('./experienceDTO/deleteOneExperienceDTO');

const postOneSoft_skill = require('./soft_skillDTO/postOneSoft_skillDTO');
const updateOneSoft_skill = require('./soft_skillDTO/updateOneSoft_skillDTO');
const deletteOneSoft_skill = require('./soft_skillDTO/deleteOneSoft_skillDTO')

const updateProfile = require('./userDTO/updateProfileDTO');

const loginDTO = require('./authDTO/loginDTO');
const signinDTO = require('./authDTO/signinDTO')

module.exports = {
    test,
    testPost,
    testProfile,
    postOneExperience,
    updateOneExperience,
    deleteOneExperience,
    postOneSoft_skill,
    updateOneSoft_skill,
    deletteOneSoft_skill,
    updateProfile,
    loginDTO,
    signinDTO
}
=======
const test = require("./testDTO");
const testPost = require("./testPostDTO");
const testProfile = require("./testPostProfileDTO");
const user = require("./userDto");

module.exports = {
  test,
  testPost,
  testProfile,
  user,
};
>>>>>>> cbad71110fc8df62619cf4940b161c15444a2d90
