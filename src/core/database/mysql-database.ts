import { DataSource, DataSourceOptions } from 'typeorm';

export class MySqlDatabase {
  private static dataSource: DataSource;

  static async connect(options: DataSourceOptions) {
    try {
      this.dataSource = new DataSource(options);
      await this.dataSource.initialize();
      console.log('Database connected successfully');
    } catch (error) {
      console.error(`MySql connection error`);
      throw error;
    }
  }

  static getDataSource(): DataSource {
    return this.dataSource;
  }
}
