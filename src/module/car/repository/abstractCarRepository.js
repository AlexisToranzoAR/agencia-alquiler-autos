const AbstractCarRepositoryError = require('./error/abstractCarRepositoryError');

module.exports = class AbstractCarRepository {
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new AbstractCarRepositoryError(
        'No se puede instanciar el repositorio de auto abstracto.'
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
