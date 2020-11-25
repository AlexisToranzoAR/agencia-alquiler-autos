const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class ClientModel extends Model {
    /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {typeof ClientModel}
     */
    static setup(sequelizeInstance) {
        ClientModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                names: {
                    type: DataTypes.STRING,
                },
                lastNames: {
                    type: DataTypes.STRING,
                },
                documentType: {
                    type: DataTypes.STRING,
                },
                documentNumber: {
                    type: DataTypes.INTEGER,
                },
                nacionality: {
                    type: DataTypes.STRING,
                },
                address: {
                    type: DataTypes.STRING,
                },
                phone: {
                    type: DataTypes.INTEGER,
                },
                email: {
                    type: DataTypes.STRING,
                },
                birthdate: {
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
                modelName: 'Client',
                timestamps: false,
            }
        );

        return ClientModel;
    }
};
