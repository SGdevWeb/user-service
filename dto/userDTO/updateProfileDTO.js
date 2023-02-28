const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function updateProfileSchema(req, res, next){

    const updateProfileSchema = Joi.object({
        user : Joi.object({
            uuid: Joi.string().required(),
            username : Joi.string().required().min(3),
            avatar : Joi.string().allow('')
        }),
        profile : Joi.object({
            description : Joi.string().allow(''),
            work : Joi.string().allow(''),
        })
    });
    schemaValidator(req, updateProfileSchema, next);
}

module.exports = updateProfileSchema;