const AbstractClientRepositoryError = require('./error/abstractClientRepositoryError');

module.exports = class AbstractClientRepository {
    constructor() {
        if (new.target === AbstractClientRepository) {
            throw new AbstractClientRepositoryError(
                'No se puede instanciar el repositorio de cliente abstracto.'
            );
        }
    }

    /**
     * @param {import('../entity/client')} client
     * @returns {import('../entity/client')}
     */
    async save(client) { }

    /**
     * @param {Number} id
     */
    async delete(id) { }

    /**
     * @param {Number} id
     * @returns {import('../entity/client')}
     */
    async getById(id) { }

    /**
     * @returns {Array<import('../entity/client')>}
     */
    async getAll() { }
};
