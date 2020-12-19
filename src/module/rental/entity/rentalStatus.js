class RentalStatus {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

module.exports.statuses = {
    PENDING: new RentalStatus('Pendiente', 0),
    PAID: new RentalStatus('Paga', 1),
    FINISHED: new RentalStatus('Finalizada', 2)
};

module.exports.RentalStatus = RentalStatus;
