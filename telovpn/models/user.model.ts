import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import ServerModel from './server.model';
import { IModel } from '../interfaces/common';

export interface UserModelType {
  user_id: number;
  start_date: number;
  role: 'user' | 'client' | 'test';
  server: string;
  expiration_time: number;
  subId: string;
  uuid: string;
  username: string;
  refer: number;
  promocode: string;
}

const UserModel = sequelize.define<IModel<UserModelType>, any>(
  'users',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['user', 'client', 'test']],
      },
    },
    server: {
      type: DataTypes.STRING,
      references: {
        model: ServerModel,
        key: 'server',
      },
    },
    expiration_time: {
      type: DataTypes.DATE,
    },
    subId: {
      type: DataTypes.STRING,
      unique: true,
    },
    uuid: {
      type: DataTypes.UUID,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    refer: {
      type: DataTypes.INTEGER,
    },
    promocode: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      afterUpdate: (user, options) => {},
      afterDestroy: (user, options) => {},
      afterCreate: (user, options) => {},
    },
  }
);

export default UserModel;
