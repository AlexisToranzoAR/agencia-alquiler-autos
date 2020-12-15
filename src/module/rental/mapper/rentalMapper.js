const Rental = require('../entity/rental');

/**
 * @param {Object} formData
 * @returns Rental
 */
function fromFormToEntity({
    id,
    'unit-price': unitPrice,
    'since-date': sinceDate,
    'until-date': untilDate,
    'total-price': totalPrice,
    'payment-method': paymentMethod,
    paid,
    'car-id': carId,
    'client-id': clientId,
}) {
    return new Rental({
        id: Number(id),
        unitPrice,
        sinceDate,
        untilDate,
        totalPrice,
        paymentMethod,
        paid: Boolean(paid),
        carId: Number(carId),
        clientId: Number(clientId)
    })
}

/**
 * @param {import('./rentalModel')} model
 * @returns {import('../../entity/rental')}
 */
function fromModelToEntity({
    id,
    unitPrice,
    sinceDate,
    untilDate,
    totalPrice,
    paymentMethod,
    paid,
    carId,
    clientId,
    createdAt,
    updatedAt,
    Car,
    Client
}, fromCarModelToEntityMapper, fromClientModelToEntityMapper) {
    return new Rental({
        id,
        unitPrice,
        sinceDate,
        untilDate,
        totalPrice,
        paymentMethod,
        paid,
        carId,
        clientId,
        createdAt,
        updatedAt,
        car: Car ? fromCarModelToEntityMapper(Car) : {},
        client: Client ? fromClientModelToEntityMapper(Client) : {}
    });
}

module.exports = {
    fromFormToEntity,
    fromModelToEntity,
};
