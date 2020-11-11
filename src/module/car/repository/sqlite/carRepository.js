const { fromModelToEntity } = require('../../mapper/carMapper');
const AbstractCarRepository = require('../abstractCarRepository');
const CarNotFoundError = require('../error/carNotFoundError');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');

module.exports = class CarRepository extends AbstractCarRepository {
    /**
   * @param {typeof import('../../model/carModel')} carModel
   * * @param {typeof import('../../../area/model/areaModel')} areaModel
   */
    constructor(carModel) {
        super();
        this.carModel = carModel;
    }

    /**
     * @param {import('../../entity/car')} car
     * @returns {import('../../entity/car')}
     */
    async save(car) {
        let carModel;

        const buildOptions = { isNewRecord: !car.id };
        carModel = this.carModel.build(car, buildOptions);
        carModel = await carModel.save();

        return fromModelToEntity(carModel);
    }

    /**
     * @param {import('../../entity/car')} car
     * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
     */
    async delete(car) {
        if (!car || !car.id) {
            throw new CarIdNotDefinedError('El ID del auto no está definido');
        }

        return Boolean(await this.carModel.destroy({where: { id:car.id }}));
    }

    /**
     * @param {Number} id
     * @returns {import('../../entity/car')}
     */
    async getById(id) {
        const carModel = await this.carModel.findOne({
            where: { id }
        });

        if (!carModel) {
            throw new CarNotFoundError(`No se encontro el auto con id ${id}`);
        }

        return fromModelToEntity(carModel)
    }

    /**
     * @return {Promise<Array<import('../../entity/car')>}
     */
    async getAll() {
        const cars = await this.carModel.findAll();
        return cars.map(fromModelToEntity);
    }
};
