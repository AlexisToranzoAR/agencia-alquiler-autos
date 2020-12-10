// configure DI container
const path = require('path');
const fs = require('fs');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer')

const { DefaultController } = require('../module/default/module');
const { CarController, CarService, CarRepository, CarModel } = require('../module/car/module');
const { ClientController, ClientService, ClientRepository, ClientModel } = require('../module/client/module');
const { RentalController, RentalService, RentalRepository, RentalModel } = require('../module/rental/module');

function configureMainSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
  return sequelize;
}

/**
 * @param {DIContainer} container
 */
function configureRentalModel(container) {
  RentalModel.setup(container.get('Sequelize'));
  RentalModel.setupAssociations(container.get('CarModel'), container.get('ClientModel'));
  return RentalModel;
}

/**
 * @param {DIContainer} container
 */
function configureCarModel(container) {
  return CarModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureClientModel(container) {
  return ClientModel.setup(container.get('Sequelize'));
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const path = process.env.MULTER_UPLOADS_DIR;
      fs.mkdirSync(path, { recursive: true })
      cb(null, path);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureMainSequelizeDatabase),
    Multer: factory(configureMulter),
    DefaultController: object(DefaultController).construct(get('RentalService'))
  });
}

/**
 * @param {DIContainer} container
 */
function addRentalModuleDefinitions(container) {
  container.addDefinitions({
    RentalController: object(RentalController).construct(
      get('RentalService'),
      get('CarService'),
      get('ClientService')
    ),
    RentalService: object(RentalService).construct(get('RentalRepository')),
    RentalRepository: object(RentalRepository).construct(
      get('RentalModel'),
      get('CarModel'),
      get('ClientModel')
    ),
    RentalModel: factory(configureRentalModel),
  })
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('Multer'), get('CarService')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('CarModel')),
    CarModel: factory(configureCarModel),
  });
}

/**
 * @param {DIContainer} container
 */
function addClientModuleDefinitions(container) {
  container.addDefinitions({
    ClientController: object(ClientController).construct(get('ClientService')),
    ClientService: object(ClientService).construct(get('ClientRepository')),
    ClientRepository: object(ClientRepository).construct(get('ClientModel')),
    ClientModel: factory(configureClientModel),
  })
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addRentalModuleDefinitions(container);
  addCarModuleDefinitions(container);
  addClientModuleDefinitions(container);
  return container;
};
