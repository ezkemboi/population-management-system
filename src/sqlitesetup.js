var Sequelize = require("sequelize");
var path = require("path");

// Sqlite database path
const dbPath = path.resolve(__dirname, "populationmanagment.db");

// Set sequelize set up
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath
});

exports = module.exports = sequelize;
