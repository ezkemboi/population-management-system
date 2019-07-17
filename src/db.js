var Sequelize = require("sequelize");
var sequlize = require("./sqlitesetup");

const Location = sequlize.define(
    "location",
    {
        name: Sequelize.STRING,
        allowNull: false
    },
    {
        totalfemale: Sequelize.INTEGER,
        allowNull: false
    },
    {
        totalmale: Sequelize.INTEGER,
        allowNull: false
    },
    {
        total: Sequelize.INTEGER,
        allowNull: false
    },
);

exports = module.exports = Location;
