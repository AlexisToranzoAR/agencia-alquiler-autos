const ClientController = require('./controller/clientController');
const ClientRepository = require('./repository/sqlite/clientRepository');
const ClientService = require('./service/clientService');
const ClientModel = require('./model/clientModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
    /**
     * @type {ClientController} controller;
     */
    const controller = container.get('ClientController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    ClientController,
    ClientService,
    ClientRepository,
    ClientModel,
};
