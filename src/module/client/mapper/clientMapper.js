const Client = require('../entity/client');

/**
 * @param {Object} formData
 * @returns Client
 */
function fromDataToEntity({
    id,
    names,
    'last-names': lastNames,
    'document-type': documentType,
    'document-number': documentNumber,
    nacionality,
    address,
    phone,
    email,
    birthdate,
}) {
    return new Client({
        id,
        names,
        lastNames,
        documentType,
        documentNumber,
        nacionality,
        address,
        phone,
        email,
        birthdate,
    })
}

/**
 * @param {import('./clientModel')} model
 * @returns {import('../../entity/client')}
 */
function fromModelToEntity(model) {
    return new Client(model.toJSON());
}

module.exports = {
    fromDataToEntity,
    fromModelToEntity,
};
