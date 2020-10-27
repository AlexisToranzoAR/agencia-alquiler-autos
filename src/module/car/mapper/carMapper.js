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
    year,
    kms,
    color,
    'air-conditioning': airConditioning,
    passengers,
    transmission,
}) {
    return new Car({
        id,
        brand,
        model,
        year,
        kms,
        color,
        airConditioning,
        passengers,
        transmission,
    });
}

/**
 *
 * @param {Object} formData
 * @returns Club
 */
function fromDbToEntity({
    id,
    brand,
    model,
    year,
    kms,
    color,
    'air_conditioning': airConditioning,
    passengers,
    transmission,
}) {
    return new Car({
        id,
        brand,
        model,
        year,
        kms,
        color,
        airConditioning,
        passengers,
        transmission,
    });
}

module.exports = {
    fromDataToEntity,
    fromDbToEntity,
};
