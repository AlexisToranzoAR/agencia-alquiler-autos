const ClientNotDefinedError = require('./error/clientNotDefinedError');
const ClientIdNotDefinedError = require('./error/clientIdNotDefinedError');
const Client = require('../entity/client');

module.exports = class Service {
    /**
     * @param {AbstractClientRepository} clientRepository
     */
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }

    async getAll() {
        return this.clientRepository.getAll();
    }

    async getById(id) {
        if (id === undefined) {
            throw new ClientIdNotDefinedError();
        }

        return this.clientRepository.getById(id);
    }

    /**
     * @param {Client} client
     */
    async save(client) {
        if (client === undefined) {
            throw new ClientNotDefinedError();
        }
        return this.clientRepository.save(client);
    }

    /**
     * @param {Client} client
     */
    async delete(client) {
        if (!(client instanceof Client)) {
            throw new ClientNotDefinedError();
        }

        return this.clientRepository.delete(client);
    }
}
