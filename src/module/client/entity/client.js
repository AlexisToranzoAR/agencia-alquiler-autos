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
    }
}
