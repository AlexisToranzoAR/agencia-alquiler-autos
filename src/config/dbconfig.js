require('dotenv').config();
const fs = require('fs');

module.exports = {
  development: {
    storage: process.env.DB_PATH,
    dialect: 'sqlite',
  }
};
