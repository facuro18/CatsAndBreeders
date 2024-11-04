import 'dotenv/config';
import * as joi from 'joi';

import { commonSchema } from '../schemas/common.schema';
import { databaseSchema } from '../schemas/database.schema';

interface EnvVars {
  NODE_ENV: string;

  PORT: number;

  DATABASE_HOST: string;

  DATABASE_PORT: number;

  DATABASE_USER: string;

  DATABASE_PASSWORD: string;

  DATABASE_SCHEMA: string;

  SECRET_JWT_AUTHENTICATION: string;
}

const envsSchema = joi
  .object({
    ...commonSchema,
    ...databaseSchema,
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  NODE_ENV: envVars.NODE_ENV,

  PORT: envVars.PORT,

  DATABASE_HOST: envVars.DATABASE_HOST,

  DATABASE_PORT: envVars.DATABASE_PORT,

  DATABASE_USER: envVars.DATABASE_USER,

  DATABASE_PASSWORD: envVars.DATABASE_PASSWORD,

  DATABASE_SCHEMA: envVars.DATABASE_SCHEMA,

  SECRET_JWT_AUTHENTICATION: envVars.SECRET_JWT_AUTHENTICATION,
};
