require('dotenv').config();
const express = require('express');
const configureDependencyInjection = require('../config/di');

const app = express();
const container = configureDependencyInjection(app);

/**
 * @type {import('sequelize').Sequelize} mainDb
 */
const mainDb = container.get('Sequelize');
container.get('RentalModel');
container.get('CarModel');
container.get('ClientModel');
mainDb.sync();

/**
 * @type {import('sequelize').Sequelize} sessionDb
 */
const sessionDb = container.get('SessionSequelize');
container.get('Session');
sessionDb.sync();
