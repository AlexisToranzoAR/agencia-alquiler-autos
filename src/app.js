require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependencyInjection = require('./config/di');
const { init: initRentalModule } = require('./module/rental/module');
const { init: initCarModule } = require('./module/car/module');
const { init: initClientModule } = require('./module/client/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const container = configureDependencyInjection(app);

initCarModule(app, container);
initClientModule(app, container);
initRentalModule(app, container);

/**
 * @type {import('./module/car/controller/carController')} controller;
 */
/* const carController = container.get('CarController');
app.get('/', carController.index.bind(carController)); */

const defaultController = container.get('DefaultController');
defaultController.configureRoutes(app);

app.use(function (err, req, res, next) {
  res.status(500);
  res.render(`default/views/error.html`, {
    title: 'Error',
    error: err
  });
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
