module.exports = class DefaultController {
  /**
   * @param {import('../../rental/service/rentalService')} rentalService
   */
  constructor(rentalService) {
    this.ROUTE_BASE = '/';
    this.rentalService = rentalService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.index.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const rentals = await this.rentalService.getAll();
    res.render(`rental/view/index.html`, { data: { rentals } });
  }

};
