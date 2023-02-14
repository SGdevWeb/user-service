const Joi = require('joi');
const schemaValidator = require('../../middleware/testMiddleware');

//shema de de verification des donner en entré de la route
function postOneSoft_skillSchema(req, res, next){
    const soft_skillSchema = Joi.object({
        name : Joi.string().required(),
        description : Joi.string().required(),
    });

    const postOneSoft_skillSchema = Joi.object({
        uuid_user : Joi.string().required(),
        soft_skill : Joi.array().items(soft_skillSchema).min(1).max(1)
    });
    schemaValidator(req, postOneSoft_skillSchema, next);
}

module.exports = postOneSoft_skillSchema;