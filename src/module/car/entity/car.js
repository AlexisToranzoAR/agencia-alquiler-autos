module.exports = class Car {
    constructor({
        id,
        brand,
        model,
        img,
        year,
        kms,
        color,
        airConditioning,
        passengers,
        transmission,
        pricePerDay,
    }) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.img = img;
        this.year = year;
        this.kms = kms;
        this.color = color;
        this.airConditioning = airConditioning;
        this.passengers = passengers;
        this.transmission = transmission;
        this.pricePerDay = pricePerDay;
    }
};
