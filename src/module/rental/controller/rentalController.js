const { fromDataToEntity } = require("../mapper/rentalMapper");
const RentalIdNotDefinedError = require("./error/rentalIdNotDefinedError");
const AbstractController = require("../../abstractController");

module.exports = class RentalController extends AbstractController {
    /**
     * @param {import('../service/rentalService')} rentalService
     * @param {import('../../car/service/carService')} carService
     * @param {import('../../client/service/clientService')} clientService
     */
    constructor(rentalService, carService, clientService) {
        super();
        this.ROUTE_BASE = "/rental";
        this.rentalService = rentalService;
        this.carService = carService;
        this.clientService = clientService;
    }

    /**
     * @param {import('express').Application} app
     */
    configureRoutes(app) {
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}/create`, this.create.bind(this));
        app.get(`${ROUTE}/view/:id`, this.view.bind(this));
        app.post(`${ROUTE}/save`, this.save.bind(this));
        app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async index(req, res) {
        const rentals = await this.rentalService.getAll();
        const { errors, messages } = req.session;
        res.render("rental/view/index.html", { data: { rentals }, messages, errors });
        req.session.errors = [];
        req.session.messages = [];
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async create(req, res) {
        const cars = await this.carService.getAll();
        const clients = await this.clientService.getAll();

        if (cars.length > 0 && clients.length > 0) {
            res.render('rental/view/form.html', { data: {cars, clients} });
        } else if (!cars.length > 0 && !clients.length > 0) {
            req.session.errors = ['Para crear un alquiler, primero debe crear un auto y un cliente'];
            res.redirect(this.ROUTE_BASE);
        } else {
            req.session.errors = [(cars.length > 0)?'Para crear un alquiler, primero debe crear un cliente':'Para crear un alquiler, primero debe crear un auto'];
            res.redirect(this.ROUTE_BASE);
        }
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async view(req, res) {
        const { id } = req.params;
        if (!id) {
            throw new RentalIdNotDefinedError();
        }

        try {
            const rental = await this.rentalService.getById(id);
            const cars = await this.carService.getAll();
            const clients = await this.clientService.getAll();
            res.render("rental/view/form.html", { data: { rental, cars, clients } });
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect("/rental");
        }
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async save(req, res) {
        try {
            const rental = fromDataToEntity(req.body);
            const savedRental = await this.rentalService.save(rental, this.carService, this.clientService);
            if (rental.id) {
                req.session.messages = [
                    `La renta con id ${rental.id} se actualizó exitosamente`,
                ];
            } else {
                req.session.messages = [
                    `Se creó la renta con id ${savedRental.id} (${savedRental.Car} ${savedRental.Client})`,
                ];
            }
            res.redirect("/rental");
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect("/rental");
        }
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async delete(req, res) {
        try {
            const { id } = req.params;
            const rental = await this.rentalService.getById(id);
            await this.rentalService.delete(rental);
            req.session.messages = [
                `Se eliminó la renta con id ${id} (${rental.Car} ${rental.Client})`,
            ];
        } catch (e) {
            req.session.errors = [e.message, e.stack];
        }
        res.redirect("/rental");
    }
};
