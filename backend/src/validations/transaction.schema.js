const Joi = require("joi");

const transactionSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  date: Joi.date().iso().required(),
  category: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  paymentMethod: Joi.string().required().trim(),
});

module.exports = {
  transactionSchema,
};
