const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function updateOneSoft_skillSchema(req, res, next){
    const soft_skillSchema = Joi.object({
        name : Joi.string().required(),
        description : Joi.string().required(),
        uuid : Joi.string().required()
    });

    const updateOneSoft_skillSchema = Joi.object({
        uuid_user : Joi.string().required(),
        soft_skill : Joi.array().items(soft_skillSchema).min(1).max(1)
    });
    schemaValidator(req, updateOneSoft_skillSchema, next);
}

module.exports = updateOneSoft_skillSchema;