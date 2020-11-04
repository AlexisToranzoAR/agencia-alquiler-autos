/**
 * @typedef {import('../repository/abstractCarRepository')} AbstractCarRepository
 */

const CarNotDefinedError = require('./error/carNotDefinedError');
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');
const Car = require('../entity/car');

module.exports = class Service {
    /**
     * @param {AbstractCarRepository} carRepository
     */
    constructor(carRepository) {
        this.carRepository = carRepository;
    }

    async getAll() {
        return this.carRepository.getAll();
    }

    async getById(id) {
        if (id === undefined) {
            throw new CarIdNotDefinedError();
        }

        return this.carRepository.getById(id);
    }

    /**
     * @param {Car} car
     */
    async save(car) {
        if (car === undefined) {
            throw new CarNotDefinedError();
        }
        return this.carRepository.save(car);
    }

    /**
     * @param {Car} car
     */
    async delete(car) {
        if (!(car instanceof Car)) {
            throw new CarNotDefinedError();
        }

        return this.carRepository.delete(car);
    }
};
