module.exports = class Client {
    constructor({
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
        createdAt,
        updatedAt,
    }) {
        this.id = id;
        this.names = names;
        this.lastNames = lastNames;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.nacionality = nacionality;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.birthdate = birthdate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
