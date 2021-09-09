'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Investor.init({
    name: {
      type: DataTypes.STRING,
      default: '',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '',
    },
    allocation: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    equity: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  }, {
    sequelize,
    modelName: 'Investor',
  });
  return Investor;
};
