const Rental = require('../entity/rental');
const Car = require('../../car/entity/car');
const Client = require('../../client/entity/client');

/**
 * @param {Object} formData
 * @returns Rental
 */
function fromDataToEntity({
    id,
    'unit-price': unitPrice,
    'since-date': sinceDate,
    'until-date': untilDate,
    'total-price': totalPrice,
    'payment-method': paymentMethod,
    paid,
    car_id,
    client_id,
}) {
    return new Rental({
        id: Number(id),
        unitPrice,
        sinceDate,
        untilDate,
        totalPrice,
        paymentMethod,
        paid: Boolean(paid),
        Car: new Car({ id: Number(car_id) }),
        Client: new Client({ id: Number(client_id) }),
    })
}

/**
 * @param {import('./rentalModel')} model
 * @returns {import('../../entity/rental')}
 */
function fromModelToEntity(model) {
    return new Rental(model.toJSON());
}

module.exports = {
    fromDataToEntity,
    fromModelToEntity,
};
