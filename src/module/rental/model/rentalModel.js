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
                    type: DataTypes.INTEGER,
                },
                sinceDate: {
                    type: DataTypes.STRING,
                },
                untilDate: {
                    type: DataTypes.STRING,
                },
                totalPrice: {
                    type: DataTypes.INTEGER,
                },
                paymentMethod: {
                    type: DataTypes.STRING,
                },
                paid: {
                    type: DataTypes.STRING,
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
                modelName: 'Rental',
                timestamps: false,
            }
        );

        return RentalModel;
    }

    /**
     * @param {import('../../car/model/carModel')} CarModel
     * @param {import('../../client/model/clientModel')} ClientModel
     */
    static setupAssociations(CarModel, ClientModel) {
        RentalModel.belongsTo(CarModel, { foreignKey: 'car_id' });
        RentalModel.belongsTo(ClientModel, { foreignKey: 'client_id' });

        return RentalModel;
    }
}
