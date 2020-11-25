const AbstractRentalRepositoryError = require('./error/abstractRentalRepositoryError');

module.exports = class AbstractRentalRepository {
    constructor() {
        if (new.target === AbstractRentalRepository) {
            throw new AbstractRentalRepositoryError(
                'No se puede instanciar el repositorio de alquiler abstracto.'
            );
        }
    }

    /**
     * @param {import('../entity/rental')} rental
     * @returns {import('../entity/rental')}
     */
    async save(rental) { }

    /**
     * @param {Number} id
     */
    async delete(id) { }

    /**
     * @param {Number} id
     * @returns {import('../entity/rental')}
     */
    async getById(id) { }

    /**
     * @returns {Array<import('../entity/rental')>}
     */
    async getAll() { }
};
