import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: String(process.env.DB_PASSWORD),
  entities: [
    __dirname + '/../model/**/*.entity.ts',
    __dirname + '/../model/**/*.entity.js',
  ],
  migrations: [__dirname + '/../migration/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
};

export default databaseConfig;
