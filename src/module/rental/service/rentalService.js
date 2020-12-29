const RentalNotDefinedError = require('./error/rentalNotDefinedError');
const CarNotDefinedError = require('../../car/service/error/carNotDefinedError');
const RentalIdNotDefinedError = require('./error/rentalIdNotDefinedError');
const Rental = require('../entity/rental');
const Car = require('../../car/entity/car')

module.exports = class Service {
  /**
   * @param {import('../repository/sqlite/rentalRepository')} rentalRepository
   */
  constructor(rentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  /**
   * @param {import('../entity/rental')} rental
   * @param {import('../../car/entity/car')} car
   */
  async makeRental(rental, car) {
    if (!(rental instanceof Rental)) {
      throw new RentalNotDefinedError();
    }
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    rental.reserve(car);
    return this.rentalRepository.save(rental);
  }

  /**
   * @param {import('../entity/rental')} rental
   */
  async unblock(rental) {
    if (!(rental instanceof Rental)) {
      throw new RentalNotDefinedError();
    }

    rental.unblock();
    return this.rentalRepository.save(rental);
  }

  /**
   * @param {import('../entity/rental')} rental
   */
  async pay(rental) {
    if (!(rental instanceof Rental)) {
      throw new RentalNotDefinedError();
    }

    rental.pay();
    return this.rentalRepository.save(rental);
  }

  /**
   * @param {import('../entity/rental')} rental
   */
  async finish(rental) {
    if (!(rental instanceof Rental)) {
      throw new RentalNotDefinedError();
    }
    
    rental.finish();
    return this.rentalRepository.save(rental);
  }

  /**
   * @param {import('../entity/rental')} rental
   */
  async delete(rental) {
    if (!(rental instanceof Rental)) {
      throw new RentalNotDefinedError();
    }

    return this.rentalRepository.delete(rental);
  }

  async getById(id) {
    if (id === undefined) {
      throw new RentalIdNotDefinedError();
    }

    return this.rentalRepository.getById(id);
  }

  async getAll() {
    return this.rentalRepository.getAll();
  }
};
