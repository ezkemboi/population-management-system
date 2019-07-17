var Sequelize = require("sequelize");
var path = require("path");

// Sqlite database path
const dbPath = path.resolve(__dirname, "populationmanagment.db");

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
