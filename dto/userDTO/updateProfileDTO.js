const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function updateProfileSchema(req, res, next){

    const updateProfileSchema = Joi.object({
        user : Joi.object({
            uuid : Joi.string().required(),
            email: Joi.string().email().lowercase(),
            lastname: Joi.string().min(3),
            firstname: Joi.string().min(3),
            username: Joi.string().min(3),
            password: Joi.string().min(8),
            oldPassword:Joi.string().min(8),
            newPassword: Joi.string().min(8) ,  
            confirmPassword: Joi.string().valid(Joi.ref('newPassword')).min(8)
        }),
        profile : Joi.object({
            description : Joi.string(),
            work : Joi.string(),
            date_birth : Joi.date().iso(),
            city : Joi.string().min(3)
        })
    });
    schemaValidator(req, updateProfileSchema, next);
}

module.exports = updateProfileSchema;