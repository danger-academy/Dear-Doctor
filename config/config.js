// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
require('dotenv').config();
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize(process.env.DATABASE_NAME, "root", process.env.DATABASE_PASSWORD, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 45,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;



// require('dotenv').config();

// module.exports = {
//   development: {
//     username: "root",
//     password: process.env.DATABASE_PASSWORD,
//     database: "deardoctor_db",
//     host: "localhost",
//     dialect: "mysql"
//   },
//   test: {
//     username: "root",
//     password: process.env.DATABASE_PASSWORD,
//     database: "testdb",
//     host: "localhost",
//     dialect: "mysql",
//     logging: false
//   },
//   production: {
//     jawsDB: "JAWSDB_URL",
//     dialect: "mysql"
//   }
// };
