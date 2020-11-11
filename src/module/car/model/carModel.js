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
        },
        model: {
          type: DataTypes.STRING,
        },
        crestUrl: {
          type: DataTypes.STRING,
        },
        year: {
          type: DataTypes.INTEGER,
        },
        kms: {
          type: DataTypes.INTEGER,
        },
        color: {
          type: DataTypes.STRING,
        },
        airConditioning: {
          type: DataTypes.BOOLEAN,
        },
        passengers: {
          type: DataTypes.INTEGER,
        },
        transmission: {
          type: DataTypes.STRING,
        },
        pricePerDay: {
          type: DataTypes.INTEGER,
        },
        lastUpdated: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Car',
        timestamps: false,
      }
    );

    return CarModel;
  }
};
