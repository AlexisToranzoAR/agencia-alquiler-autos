const { fromModelToEntity } = require('../../mapper/clientMapper');
const AbstractClientRepository = require('../abstractClientRepository');
const ClientNotFoundError = require('../error/clientNotFoundError');
const ClientIdNotDefinedError = require('../error/clientIdNotDefinedError');

module.exports = class ClientRepository extends AbstractClientRepository {
    /**
   * @param {typeof import('../../model/clientModel')} clientModel
   */
    constructor(clientModel) {
        super();
        this.clientModel = clientModel;
    }

    /**
     * @param {import('../../entity/client')} client
     * @returns {import('../../entity/client')}
     */
    async save(client) {
        let clientModel;

        const buildOptions = { isNewRecord: !client.id };
        clientModel = this.clientModel.build(client, buildOptions);
        clientModel = await clientModel.save();

        return fromModelToEntity(clientModel);
    }

    /**
     * @param {import('../../entity/client')} client
     * @returns {Boolean}
     */
    async delete(client) {
        if (!client || !client.id) {
            throw new ClientIdNotDefinedError('El ID del cliente no está definido');
        }

        return Boolean(await this.clientModel.destroy({ where: { id: client.id } }));
    }

    /**
     * @param {Number} id
     * @returns {import('../../entity/client')}
     */
    async getById(id) {
        const clientModel = await this.clientModel.findOne({
            where: { id }
        });

        if (!clientModel) {
            throw new ClientNotFoundError(`No se encontro el cliente con ID ${id} puede que alla sido borrado`);
        }

        return fromModelToEntity(clientModel)
    }

    /**
     * @return {Promise<Array<import('../../entity/client')>}
     */
    async getAll() {
        const clients = await this.clientModel.findAll();
        return clients.map(fromModelToEntity);
    }
}
