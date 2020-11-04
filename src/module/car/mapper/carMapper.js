const Car = require('../entity/car');

/**
 *
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
 *
 * @param {Object} formData
 * @returns Car
 */
function fromDbToEntity({
    id,
    brand,
    model,
    'crest_url': crestUrl,
    year,
    kms,
    color,
    'air_conditioning': airConditioning,
    passengers,
    transmission,
    'price_per_day': pricePerDay,
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

module.exports = {
    fromDataToEntity,
    fromDbToEntity,
};
