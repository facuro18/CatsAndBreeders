import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmDBProvider = {
  provide: DataSource, // add the datasource as a provider
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    // using the factory function to create the datasource instance
    try {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_SCHEMA'),
        synchronize: false,
        entities: [`${__dirname}/../**/models/**.model{.ts,.js}`], // this will automatically load all entity files in the src folder
        logging: ['query', 'error'],
      });
      await dataSource.initialize(); // initialize the data source
      console.log('Database connected successfully');
      return dataSource;
    } catch (error) {
      console.log('Error connecting to database');
      throw error;
    }
  },
};
