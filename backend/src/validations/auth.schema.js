const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().message("Enter a valid email!").required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required().trim(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().message("Enter a valid email!").required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
