import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { IModel } from '../interfaces/common';

interface ServerModelType {
  server: string;
  url: string;
  cnt_users: number;
  max_users: number;
}

const ServerModel = sequelize.define<IModel<ServerModelType>, any>('servers', {
  server: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isUrl: true,
    },
  },
  cnt_users: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  max_users: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default ServerModel;
