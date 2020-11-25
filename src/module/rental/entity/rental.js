module.exports = class Rental {
    constructor({
        id,
        unitPrice,
        sinceDate,
        untilDate,
        totalPrice,
        paymentMethod,
        paid,
        Car,
        Client,
    }) {
        this.id = id;
        this.unitPrice = unitPrice;
        this.sinceDate = sinceDate;
        this.untilDate = untilDate;
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
        this.paid = paid;
        /**
         * @type {import('../../car/entity/car');} this.Car
         */
        this.Car = Car;
        /**
         * @type {import('../../client/entity/client');} this.Client
         */
        this.Client = Client;
    }
}