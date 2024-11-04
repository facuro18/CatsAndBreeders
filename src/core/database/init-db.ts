import { envs } from '@core/adapters/envs.adapter';
import { MySqlDatabase } from './mysql-database';

export class InitDB {
  static async start() {
    await MySqlDatabase.connect({
      type: 'mysql',
      host: envs.DATABASE_HOST,
      port: envs.DATABASE_PORT,
      username: envs.DATABASE_USER,
      password: envs.DATABASE_PASSWORD,
      database: envs.DATABASE_SCHEMA,
      synchronize: true,
      entities: [`${__dirname}/../../modules/**/models/*.model{.ts,.js}`],
      logging: ['query', 'error'],
    });
    console.log(`${__dirname}/../modules/**/models/**.model{.ts,.js}`);
  }
}
