import * as Joi from 'joi';

export const commonSchema = {
  NODE_ENV: Joi.string().valid('development').required(),
  PORT: Joi.number().default(3000),
};
