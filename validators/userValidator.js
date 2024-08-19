const Joi = require('joi');

const userValidation = (body) => {
    const userSchema = Joi.object(
        {
            nom: Joi.string().trim().required(),
            email: Joi.string().trim().required(),
            telephone: Joi.string().trim().required(),
            password: Joi.string().trim().required(),
            status: Joi.string().trim()
        }
    )

    return userSchema.validate(body)
}

module.exports = userValidation;