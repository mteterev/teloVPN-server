import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB ?? '',
  process.env.POSTGRES_USER ?? '',
  process.env.POSTGRES_PASSWORD ?? '',
  {
    host: 'postgres',
    port: 5432,
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize.authenticate();
