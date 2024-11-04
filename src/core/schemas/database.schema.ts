import * as Joi from 'joi';

export const databaseSchema = {
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_SCHEMA: Joi.string().required(),
};
