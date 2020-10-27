module.exports = class Car {
    constructor({
        id,
        brand,
        model,
        year,
        kms,
        color,
        airConditioning,
        passengers,
        transmission,
    }) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.kms = kms;
        this.color = color;
        this.airConditioning = airConditioning;
        this.passengers = passengers;
        this.transmission = transmission;
    }
};
