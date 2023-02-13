const Joi = require('joi');
const schemaValidator = require('../middleware/testMiddleware');

function testSchema(req, res, next){
    const testSchema = Joi.object({
        name: Joi.string().required()
    });
    schemaValidator(req, testSchema, next)
}



module.exports = testSchema