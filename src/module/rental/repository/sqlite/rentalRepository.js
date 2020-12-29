const { fromModelToEntity } = require('../../mapper/rentalMapper');
const { fromModelToEntity: fromCarModelToEntity } = require('../../../car/mapper/carMapper');
const {
  fromModelToEntity: fromClientModelToEntity,
} = require('../../../client/mapper/clientMapper');
const AbstractRentalRepository = require('../abstractRentalRepository');
const RentalNotFoundError = require('../error/rentalNotFoundError');
const RentalIdNotDefinedError = require('../error/rentalIdNotDefinedError');

module.exports = class RentalRepository extends AbstractRentalRepository {
  /**
   * @param {typeof import('../../model/rentalModel')} rentalModel
   * @param {typeof import('../../../car/model/carModel')} carModel
   * @param {typeof import('../../../client/model/clientModel')} clientModel
   */
  constructor(rentalModel, carModel, clientModel) {
    super();
    this.rentalModel = rentalModel;
    this.carModel = carModel;
    this.clientModel = clientModel;
  }

  /**
   * @param {import('../../entity/rental')} rental
   * @returns {Promise<import('../../entity/rental')>}
   */
  async save(rental) {
    const rentalData = Object.assign({}, rental);
    rentalData.status = rental.status.value;
    const rentalInstance = this.rentalModel.build(rentalData, {
      isNewRecord: !rentalData.id,
    });
    await rentalInstance.save();

    return fromModelToEntity(rentalInstance, fromCarModelToEntity, fromClientModelToEntity);
  }

  /**
   * @param {import('../../entity/rental')} rental
   * @returns {Boolean}
   */
  async delete(rental) {
    if (!rental || !rental.id) {
      throw new RentalIdNotDefinedError();
    }

    return Boolean(await this.rentalModel.destroy({ where: { id: rental.id } }));
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('../../entity/rental')>}
   */
  async getById(id) {
    const rentalModel = await this.rentalModel.findByPk(id, {
      include: [
        { model: this.carModel, paranoid: false },
        { model: this.clientModel, paranoid: false },
      ],
    });

    if (!rentalModel) {
      throw new RentalNotFoundError(`No se encontró el alquiler con ID ${id}`);
    }

    return fromModelToEntity(rentalModel, fromCarModelToEntity, fromClientModelToEntity);
  }

  /**
   * @return {Promise<Array<import('../../entity/rental')>>}
   */
  async getAll() {
    const rentals = await this.rentalModel.findAll({
      include: [
        { model: this.carModel, paranoid: false },
        { model: this.clientModel, paranoid: false },
      ],
    });

    return rentals.map((r) => fromModelToEntity(r, fromCarModelToEntity, fromClientModelToEntity));
  }
};
