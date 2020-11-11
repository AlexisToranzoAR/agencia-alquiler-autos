const AbstractCarRepositoryError = require('./error/abstractCarRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractCarRepository {
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new AbstractCarRepositoryError(
        'No se puede instanciar el repositorio de car abstracto.'
      );
    }
  }

  /**
   * @param {import('../entity/car')} car
   * @returns {import('../entity/car')}
   */
  async save(car) {}

  /**
   * @param {Number} id
   */
  async delete(id) {}

  /**
   * @param {Number} id
   * @returns {import('../entity/car')}
   */
  async getById(id) {}

  /**
   * @returns {Array<import('../entity/car')>}
   */
  async getAll() {}
};
