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
                    allowNull: false,
                },
                lastNames: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                documentType: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                documentNumber: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                nacionality: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                birthdate: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'Client',
                tableName: 'clients',
                underscored: true,
                paranoid: true
            }
        );

        return ClientModel;
    }
};
