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
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_schema'),
        synchronize: true,
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
