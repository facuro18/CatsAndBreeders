import * as Joi from 'joi';
import { commonSchema } from './common/common.config';
import { databaseSchema } from './database/database.config';

export const ConfigurationSchema = Joi.object({
  ...commonSchema,
  ...databaseSchema,
});
