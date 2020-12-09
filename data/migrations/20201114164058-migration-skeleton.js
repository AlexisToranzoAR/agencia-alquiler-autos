'use strict';

const ClientModel = require('../../src/module/client/model/clientModel');
const CarModel = require('../../src/module/car/model/carModel');
const RentalModel = require('../../src/module/rental/model/rentalModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    ClientModel.setup(queryInterface.sequelize).sync({ force: true });
    CarModel.setup(queryInterface.sequelize).sync({ force: true });
    RentalModel.setup(queryInterface.sequelize).setupAssociations(CarModel, ClientModel).sync({ force: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clients');
    await queryInterface.dropTable('cars');
    await queryInterface.dropTable('rentals');
  }
};
