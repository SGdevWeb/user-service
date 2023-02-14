const Joi = require('joi');
const schemaValidator = require('../middleware/testMiddleware');

//shema de de verification des donner en entré de la route
function postOneExperienceSchema(req, res, next){
    const experienceSchema = Joi.object({
        name : Joi.string().required().min(3).max(40),
        date_start: Joi.date().iso().required(),
        date_end : Joi.date().iso(),
        description : Joi.string().required().min(3),
        place : Joi.string().required().min(3),
        uuid : Joi.string().required()
    });

    const postOneExperienceSchema = Joi.object({
        uuid_user : Joi.string().required(),
        experience : Joi.array().items(experienceSchema).min(1).max(1),
    });
    schemaValidator(req, postOneExperienceSchema, next);
}

module.exports = postOneExperienceSchema;