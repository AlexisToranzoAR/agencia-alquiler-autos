// configure DI container
const path = require('path');
const fs = require('fs');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');
const moment = require('../../public/js/moment')

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
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

function configureSessionSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SESSION_DB_PATH,
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

/**
 * @param {DIContainer} container
 */
function configureSession(container) {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sequelize = container.get('SessionSequelize');
  const sessionOptions = {
    store: new SequelizeStore({ db: sequelize }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const path = process.env.CRESTS_UPLOAD_DIR;
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
    SessionSequelize: factory(configureSessionSequelizeDatabase),
    Session: factory(configureSession),
    Multer: factory(configureMulter),
    Moment: factory(moment)
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
    RentalService: object(RentalService).construct(get('RentalRepository'), get('Moment')),
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
