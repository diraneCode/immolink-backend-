const Joi = require('joi')

const roomValidation = (body) => {
    const roomSchema = Joi.object(
        {
            type: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            prix: Joi.number().required(),
            photo: Joi.string().trim().required(),
            proprietaire: Joi.number().required(),
            ville: Joi.string().trim().required(),
            longitude: Joi.number().required(),
            latitude: Joi.number().required(),
            statut: Joi.boolean().required()
        }
    )

    return roomSchema.validate(body);
}

module.exports = roomValidation;