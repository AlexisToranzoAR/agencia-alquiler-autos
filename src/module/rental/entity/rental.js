module.exports = class Rental {
    /**
   * @param {number} id
   * @param {number} unitPrice
   * @param {string} sinceDate
   * @param {string} untilDate
   * @param {number} totalPrice
   * @param {string} paymentMethod
   * @param {boolean} paid
   * @param {number} carId
   * @param {number} userId
   * @param {string} createdAt
   * @param {string} updatedAt
   * @param {import('../../car/entity/car')} car
   * @param {import('../../client/entity/client')} client
   */
    constructor({
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
        car,
        client,
    }) {
        this.id = id;
        this.unitPrice = unitPrice;
        this.sinceDate = new Date(sinceDate);
        this.untilDate = new Date(untilDate);
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
        this.paid = paid;
        this.carId = carId;
        this.clientId = clientId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.car = car;
        this.client = client;
    }
}