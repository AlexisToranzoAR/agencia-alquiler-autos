const Car = require('../entity/car');

/**
 * @param {Object} formData
 * @returns Car
 */
function fromDataToEntity({
    id,
    brand,
    model,
    'crest-url': crestUrl,
    year,
    kms,
    color,
    'air-conditioning': airConditioning,
    passengers,
    transmission,
    'price-per-day': pricePerDay,
}) {
    return new Car({
        id,
        brand,
        model,
        crestUrl,
        year,
        kms,
        color,
        airConditioning,
        passengers,
        transmission,
        pricePerDay,
    });
}

/**
 * @param {import('./carModel')} model
 * @returns {import('../../entity/car')}
 */
function fromModelToEntity(model) {
    return new Car(model.toJSON());
}

module.exports = {
    fromDataToEntity,
    fromModelToEntity,
};
