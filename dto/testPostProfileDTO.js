const Joi = require('joi');
const schemaValidator = require('../middleware/testMiddleware');

function testPostProfileSchema(req, res, next){
    const experienceSchema = Joi.object({
        name : Joi.string().required(),
        date_start: Joi.date().iso().required(),
        date_end : Joi.date().iso(),
        description : Joi.string().required(),
        place : Joi.string().required()
    });

    const soft_skillSchema = Joi.object({
        name : Joi.string().required(),
        description : Joi.string().required(),
    });

    const testPostProfileSchema = Joi.object({
        description : Joi.string().empty('').required(),
        date_birth : Joi.date().iso().required(),
        city : Joi.string().required(),
        work : Joi.string().required(),
        uuid_user : Joi.string().required(),
        experience : Joi.array().items(experienceSchema),
        soft_skill : Joi.array().items(soft_skillSchema)
    });

    schemaValidator(req, testPostProfileSchema, next);
}

module.exports = testPostProfileSchema;