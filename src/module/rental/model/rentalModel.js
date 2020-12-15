const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class RentalModel extends Model {
    /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {typeof ClientModel}
     */
    static setup(sequelizeInstance) {
        RentalModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                unitPrice: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                sinceDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                untilDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                totalPrice: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                paymentMethod: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                paid: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'Rental',
                tableName: 'rentals',
                underscored: true
            }
        );

        return RentalModel;
    }

    /**
     * @param {import('../../car/model/carModel')} CarModel
     * @param {import('../../client/model/clientModel')} ClientModel
     */
    static setupAssociations(CarModel, ClientModel) {
        CarModel.hasMany(RentalModel, { foreignKey: 'carId', constraints: false });
        RentalModel.belongsTo(CarModel, { foreignKey: 'carId', constraints: false });
        ClientModel.hasMany(RentalModel, { foreignKey: 'clientId', constraints: false });
        RentalModel.belongsTo(ClientModel, { foreignKey: 'clientId', constraints: false });

        return RentalModel;
    }
}
