const Rental = require('../entity/rental');
const { RentalStatus, statuses } = require('../entity/rentalStatus');


/**
 * @param {Number} statusId
 * @returns {RentalStatus}
 */
function getRentalStatusById(statusId) {
  /**
   * @type {RentalStatus[]}
   */
  const statusesList = Object.values(statuses);
  return statusesList.find((status) => status.value == statusId);
}

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
  status,
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
    status,
    carId: Number(carId),
    clientId: Number(clientId),
  });
}

/**
 * @param {import('./rentalModel')} model
 * @returns {import('../../entity/rental')}
 */
function fromModelToEntity(
  {
    id,
    unitPrice,
    sinceDate,
    untilDate,
    totalPrice,
    paymentMethod,
    status,
    carId,
    clientId,
    createdAt,
    updatedAt,
    Car,
    Client,
  },
  fromCarModelToEntityMapper,
  fromClientModelToEntityMapper
) {
  return new Rental({
    id,
    unitPrice,
    sinceDate,
    untilDate,
    totalPrice,
    paymentMethod,
    status: getRentalStatusById(status),
    carId,
    clientId,
    createdAt,
    updatedAt,
    car: Car ? fromCarModelToEntityMapper(Car) : {},
    client: Client ? fromClientModelToEntityMapper(Client) : {},
  });
}

module.exports = {
  fromFormToEntity,
  fromModelToEntity,
};
