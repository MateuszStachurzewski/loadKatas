const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    language: Joi.string().min(1).max(200).required(),
    country: Joi.string().min(1).max(200).required(),
    currency: Joi.string().min(1).max(100).required()
    })

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

const searchBookValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required()
    })
    return schema.validate(data)
}

const addBookToBasketValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().required()
    })
    return schema.validate(data)
}

const orderSubmitValidation = (data) => {
    const schema = Joi.object({
        basketID: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.searchBookValidation = searchBookValidation;
module.exports.addBookToBasketValidation = addBookToBasketValidation;
module.exports.orderSubmitValidation = orderSubmitValidation;