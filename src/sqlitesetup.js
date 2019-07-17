var Sequelize = require("sequelize");
var path = require("path");
var dotenv = require("dotenv");

// Set env for db
dotenv.config();
const env = process.env.NODE_ENV

// Sqlite database path for development and test
const developmentDbPath = path.resolve(__dirname, "dev.db");
const testDbPath = path.resolve(__dirname, "test.db");
const dbPath = env === "test" ? testDbPath : developmentDbPath;

// Set sequelize set up
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath
});

// Authenticate connection to the db
sequelize.authenticate().then(() => {
    console.log("Connection had been established successflly")
}).catch(err => {
    console.log(`Unable to connect to database and error is ${err}`)
});

sequelize.sync().done();

exports = module.exports = sequelize;
