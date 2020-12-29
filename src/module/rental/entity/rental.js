const { statuses } = require('./rentalStatus');

module.exports = class Rental {
    /**
   * @param {number} id
   * @param {number} unitPrice
   * @param {string} sinceDate
   * @param {string} untilDate
   * @param {number} totalPrice
   * @param {string} paymentMethod
   * @param @param {import('./rentalStatus').RentalStatus} status
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
        status,
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
        this.formattedDates = this.formatDate();
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.carId = carId;
        this.clientId = clientId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.car = car;
        this.client = client;
    }

    formatDate() {
        const [sinceDate, untilDate] = [this.sinceDate, this.untilDate].map((date) =>
          new Date(date).toLocaleString(false, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            //hour: 'numeric',
            //minute: 'numeric',
          })
        );
        return { sinceDate, untilDate };
    }

    calculateRentalLength() {
      const MILISECONDS_IN_A_DAY = 86400000;
      const sinceDate = new Date(this.sinceDate).getTime();
      const untilDate = new Date(this.untilDate).getTime();
      return Math.ceil((untilDate - sinceDate) / MILISECONDS_IN_A_DAY);
    }
  
    /**
     * @param {import('../../car/entity/car')} car
     */
    reserve(car) {
      this.unitPrice = this.unitPrice || car.pricePerDay;
      this.totalPrice = this.unitPrice * this.calculateRentalLength();
      return this;
    }
  
    pay() {
      this.status = statuses.PAID;
      return this;
    }
  
    finish() {
      if (this.paid !== true) {
        throw new Error("El alquiler no puede finalizarse porque no está pago.")
      }
  
      this.status = statuses.FINISHED;
      return this;
    }
  
    unblock() {
      this.status = statuses.PENDING;
    }
  
    get paid(){
      return this.status.value === statuses.PAID.value;
    }
}