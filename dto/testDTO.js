const { body } = require('express-validator');
//test
const testDTO = [
    body("name").exists().isString().notEmpty()
];

const testPostDTO = [
    body("email").exists().isString().notEmpty(),
    body("password").exists().isString().notEmpty(),
    body("username").exists().isString().notEmpty(),
    body("firstname").exists().isString().notEmpty(),
    body("lastname").exists().isString().notEmpty()
];

module.exports = {
    testDTO,
    testPostDTO
};