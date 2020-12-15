const { fromDataToEntity } = require("../mapper/clientMapper");
const ClientIdNotDefinedError = require("./error/clientIdNotDefinedError");
const AbstractController = require("../../abstractController");

module.exports = class ClientController extends AbstractController {
    /**
     * @param {import('../service/clientService')} clientService
     */
    constructor(clientService) {
        super();
        this.ROUTE_BASE = '/client';
        this.clientService = clientService;
    }

    /**
     * @param {import('express').Application} app
     */
    configureRoutes(app) {
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}/create`, this.create.bind(this));
        app.get(`${ROUTE}/edit/:id`, this.view.bind(this));
        app.post(`${ROUTE}/save`, this.save.bind(this));
        app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async index(req, res) {
        const clients = await this.clientService.getAll();
        res.render("client/view/index.html", { data: { clients }/* , messages, errors */ });
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async create(req, res) {
        res.render("client/view/form.html");
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async view(req, res, next) {
        const { id } = req.params;
        if (!id) {
            throw new ClientIdNotDefinedError();
        }

        try {
            const client = await this.clientService.getById(id);
            res.render("client/view/form.html", { data: { client } });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async save(req, res, next) {
        try {
            const client = fromDataToEntity(req.body);
            const savedClient = await this.clientService.save(client);
            /* if (client.id) {
                req.session.messages = [
                    `El cliente con id ${client.id} se actualizó exitosamente`,
                ];
            } else {
                req.session.messages = [
                    `Se creó el cliente con id ${savedClient.id} (${savedClient.names} ${savedClient.lastNames})`,
                ];
            } */
            res.redirect("/client");
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const client = await this.clientService.getById(id);
            await this.clientService.delete(client);
            /* req.session.messages = [
                `Se eliminó el cliente con id ${id} (${client.names} ${client.lastNames})`,
            ]; */
            res.redirect("/client");
        } catch (e) {
            next(e);
        }
    }
};
