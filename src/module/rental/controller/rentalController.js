const { fromFormToEntity } = require('../mapper/rentalMapper');
const { statuses: rentalStatuses } = require('../entity/rentalStatus');
const RentalIdNotDefinedError = require('./error/rentalIdNotDefinedError');
const AbstractController = require('../../abstractController');

module.exports = class RentalController extends AbstractController {
  /**
   * @param {import('../service/rentalService')} rentalService
   * @param {import('../../car/service/carService')} carService
   * @param {import('../../client/service/clientService')} clientService
   */
  constructor(rentalService, carService, clientService) {
    super();
    this.ROUTE_BASE = '/rental';
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
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/unblock/:id`, this.unblock.bind(this));
    app.get(`${ROUTE}/pay/:id`, this.pay.bind(this));
    app.get(`${ROUTE}/finish/:id`, this.finish.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async index(req, res, next) {
    try {
      const rentals = await this.rentalService.getAll();
      res.render('rental/view/index.html', { rentals, rentalStatuses });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async view(req, res, next) {
    const { id } = req.params;
    if (!id) {
      throw new RentalIdNotDefinedError();
    }

    try {
      const rental = await this.rentalService.getById(id);
      res.render('rental/view/view.html', { rental });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const cars = await this.carService.getAll();
      const clients = await this.clientService.getAll();

      if (cars.length > 0 && clients.length > 0) {
        res.render('rental/view/form.html', { cars, clients });
      } else if (!cars.length > 0 && !clients.length > 0) {
        throw new Error('Para crear un alquiler, primero debe crear un auto y un cliente');
      } else {
        const error =
          cars.length > 0
            ? 'Para crear un alquiler, primero debe crear un cliente'
            : 'Para crear un alquiler, primero debe crear un auto';
        throw new Error(error);
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async edit(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new RentalIdNotDefinedError();
      }

      const rental = await this.rentalService.getById(id);
      const cars = await this.carService.getAll();
      const clients = await this.clientService.getAll();
      res.render('rental/view/form.html', { rental, cars, clients });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async save(req, res, next) {
    try {
      const formData = Object.assign({}, req.body);
      const { 'car-id': carId, 'client-id': clientId } = formData;
      formData.car = await this.carService.getById(carId);
      formData.client = await this.clientService.getById(clientId);
      formData.status = formData.paid ? rentalStatuses.PAID : rentalStatuses.PENDING;

      const rental = fromFormToEntity(formData);
      await this.rentalService.makeRental(rental, formData.car);
      res.redirect('/rental');
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async unblock(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new RentalIdNotDefinedError();
      }

      const rental = await this.rentalService.getById(id);
      await this.rentalService.unblock(rental);
      res.redirect('/rental');
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async pay(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new RentalIdNotDefinedError();
      }

      const rental = await this.rentalService.getById(id);
      await this.rentalService.pay(rental);
      res.redirect('/rental');
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async finish(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new RentalIdNotDefinedError();
      }

      const rental = await this.rentalService.getById(id);
      await this.rentalService.finish(rental);
      res.redirect('/rental');
    } catch (e) {
      next(e);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new RentalIdNotDefinedError();
      }

      const rental = await this.rentalService.getById(id);
      await this.rentalService.delete(rental);
      res.redirect('/rental');
    } catch (e) {
      next(e);
    }
  }
};
