const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class CarModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof CarModel}
   */
  static setup(sequelizeInstance) {
    CarModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        img: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        kms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        airConditioning: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        passengers: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        transmission: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        pricePerDay: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Car',
        tableName: 'cars',
        underscored: true,
        paranoid: true
      }
    );

    return CarModel;
  }
};
