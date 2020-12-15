const RentalNotDefinedError = require('./error/rentalNotDefinedError');
const RentalIdNotDefinedError = require('./error/rentalIdNotDefinedError');
const Rental = require('../entity/rental');

module.exports = class Service {
    /**
     *
     * @param {AbstractRentalRepository} rentalRepository
     */
    constructor(rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    /**
     * @param {Rental} rental
     */
    async save(rental) {
        if (rental === undefined) {
            throw new RentalNotDefinedError();
        }

        return this.rentalRepository.save(rental);
    }

    /**
     * @param {Rental} rental
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

/* function unitPriceValidation(rental, carService) {
    const car = carService.getById(rental.Car.id);

    if (car.pricePerDay !== rental.unitPrice) {
        throw new RentalUnitPriceError();
    }
}

function totalPriceValidation(rental, moment) {
    const sinceDate = moment(rental.sinceDate);
    const untilDate = moment(rental.untilDate);
    const unitPrice = Number(rental.unitPrice);

    const daysDifference = untilDate.diff(sinceDate, 'days');
    const totalPrice = daysDifference * unitPrice;

    if (totalPrice !== rental.totalPrice) {
        throw new RentalTotalPriceError();
    }
}

function rejectRepeat(rental, rentals) {
    

    //consultar por la tabla rental

} */
