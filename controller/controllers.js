const test = require('./testController');

const user = require('./userController');
const experience = require('./experienceController');
const soft_skill = require('./soft_skillController');
const auth = require('./authController')

module.exports = {
    test,
    user,
    experience,
    soft_skill,
    auth
}