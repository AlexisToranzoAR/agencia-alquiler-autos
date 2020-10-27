const { default: DIContainer, object, get, factory } = require('rsdi');
const Sqlite3Database = require('better-sqlite3');

const session = require('express-session');
const { CarController, CarService, CarRepository } = require('../module/car/module');

function configureMainDatabaseAdapter() {
    return new Sqlite3Database(process.env.DB_PATH, {
        verbose: console.log,
    });
}

function configureSession() {
    const ONE_WEEK_IN_SECONDS = 604800000;
    //const ONE_MONTH_IN_SECONDS = 2629800000; 

    const sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: ONE_WEEK_IN_SECONDS },
    };
    return session(sessionOptions);
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
    container.addDefinitions({
        MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
        Session: factory(configureSession),
    });
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
    container.addDefinitions({
        CarController: object(CarController).construct(get('CarService')),
        CarService: object(CarService).construct(get('CarRepository')),
        CarRepository: object(CarRepository).construct(get('MainDatabaseAdapter')),
    });
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addCarModuleDefinitions(container);
    return container;
};
