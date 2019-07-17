var Sequelize = require("sequelize");
var sequelize = require("./sqlitesetup");

const Location = sequelize.define(
    "location",
    {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        totalfemale: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        totalmale: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        // options
    }
);

exports = module.exports = Location;
