import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { IModel } from '../interfaces/common';

interface PricesModelType {
  promocode: string;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
  month12: number;
  end_date: number;
  validity: number;
}

const PricesModel = sequelize.define<IModel<PricesModelType>, any>('prices', {
  promocode: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  month1: {
    type: DataTypes.INTEGER,
    validate: {
      min: 100,
    },
    allowNull: false,
  },
  month2: {
    type: DataTypes.INTEGER,
    validate: {
      min: 100,
    },
    allowNull: false,
  },
  month3: {
    type: DataTypes.INTEGER,
    validate: {
      min: 100,
    },
    allowNull: false,
  },
  month6: {
    type: DataTypes.INTEGER,
    validate: {
      min: 100,
    },
    allowNull: false,
  },
  month12: {
    type: DataTypes.INTEGER,
    validate: {
      min: 100,
    },
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  validity: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
    },
  },
});

export default PricesModel;
