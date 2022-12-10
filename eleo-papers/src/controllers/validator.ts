import Joi from 'joi';

export default class Validator {
    static createPaper = Joi.object({
        author: Joi.string().required(),
        title: Joi.string().required(),
        date: Joi.date().optional(),
        institution: Joi.string().optional(),
        content: Joi.string().required()
    }).options({ abortEarly: false });
}
