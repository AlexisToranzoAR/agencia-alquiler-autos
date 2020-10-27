const AbstractCarRepository = require('../abstractCarRepository');
const CarNotFoundError = require('../error/carNotFoundError');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');
const { fromDbToEntity } = require('../../mapper/carMapper');

module.exports = class CarRepository extends AbstractCarRepository {
    /**
     * @param {import('better-sqlite3').Database} databaseAdapter
     */
    constructor(databaseAdapter) {
        super();
        this.databaseAdapter = databaseAdapter;
    }

    /**
     * @param {import('../../entity/car')} car
     * @returns {import('../../entity/car')}
     */
    save(car) {
        let id;
        const isUpdate = car.id;
        if (isUpdate) {
            id = car.id;
            const statement = this.databaseAdapter.prepare(`
                UPDATE cars SET
                brand = ?,
                model = ?,
                year = ?,
                kms = ?,
                color = ?,
                air_conditioning = ?,
                passengers = ?,
                transmission = ?,
                WHERE id = ?
            `);

            const params = [
                car.brand,
                car.model,
                car.year,
                car.kms,
                car.color,
                car.airConditioning,
                car.passengers,
                car.transmission,
                car.id
            ];

            statement.run(params);
        } else {
            const statement = this.databaseAdapter.prepare(`
                INSERT INTO cars(
                brand
                model
                year
                kms
                color
                air_conditioning
                passengers
                transmission
                ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
            `);

            const result = statement.run(
                car.brand,
                car.model,
                car.year,
                car.kms,
                car.color,
                car.airConditioning,
                car.passengers,
                car.transmission
            );

            id = result.lastInsertRowid;
        }

        return this.getById(id);
    }

    /**
     * @param {import('../../entity/car')} car
     * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
     */
    delete(car) {
        if (!car || !car.id) {
            throw new CarIdNotDefinedError('El ID del auto no está definido');
        }

        this.databaseAdapter.prepare('DELETE FROM cars WHERE id = ?').run(car.id);

        return true;
    }

    /**
     * @param {Number} id
     * @returns {import('../../entity/car')}
     */
    getById(id) {
        const car = this.databaseAdapter
            .prepare(`
                SELECT
                id,
                brand,
                model,
                year,
                kms,
                color,
                air_conditioning,
                passengers,
                transmission
                FROM cars WHERE id = ?
            `)
            .get(id);

        if (car === undefined) {
            throw new CarNotFoundError(`No se encontró el auto con ID: ${id}`);
        }

        return fromDbToEntity(car);
    }

    /**
     * @return {Array<import('../../entity/car')>}
     */
    getAll() {
        const cars = this.databaseAdapter
            .prepare(`
                SELECT
                id,
                brand,
                model,
                year,
                kms,
                color,
                air_conditioning,
                passengers,
                transmission
                FROM cars
            `)
            .all();
        return cars.map((carData) => fromDbToEntity(carData));
    }
};
