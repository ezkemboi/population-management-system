const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var Location = require("./db");
var sequlize = require("./sqlitesetup");

const port = 8000;
const app = express();

// Set up body parsers
app.use(bodyParser.json());
// Extend url parser urlencoded

app.use(bodyParser.urlencoded({
    extended: false
}));

// Set up cross origin
app.use(cors());

// Get the current homepage
app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Welcome to Population API"
    });
});

// Create new locations
app.post('/locations', async (req, res) => {
    const { name, femalePopulation, malePopulation } = req.body;
    if (!name || !femalePopulation || !malePopulation) {
        res.status(400).send({
            success: false,
            message: "Name, female population and male population is required"
        });
    };
    const totalPopulation = femalePopulation + malePopulation;
    const locationDetails = await Location.save({
        name: name,
        totalfemale: femalePopulation,
        totalmale: malePopulation,
        total: totalPopulation
    });
    console.log('-->>>>loca-->>>', locationDetails);
    res.status(201).send({
        success: true,
        message: "Location created successfully.",
        locationDetails
    });
});

// Get all locations
app.get('/locations', async (req, res) => {
    const locations = await Location.findAll();

    if (!locations || locations.length < 1) {
        res.status(404).send({
            success: false,
            message: "There are no locations at the moment"
        });
    };

    res.status(200).send({
        success: true,
        message: "Locations returned successfully.",
        locations,
        total: locations.length
    });
});

// Get single location details 
app.get('/locations/:id', async (req, res) => {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
        res.status(404).send({
            success: false,
            message: "Location with that id id not found"
        });
    };
    res.status(200).send({
        success: true,
        message: "Successfully retrived location",
        location
    });
});

// Edit location
app.put('/locations/:id', async (req, res) => {
    const { name, femalePopulation, malePopulation } = req.body;
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
        res.status(404).send({
            success: false,
            message: "Location not found"
        });
    };
    const totalPopulation = femalePopulation + malePopulation;
    const updateInfo = await Location.update({
        name,
        totalfemale: femalePopulation,
        totalmale: malePopulation,
        total: totalPopulation
    });

    res.send(200).send({
        success: true,
        message: "Location's details Updated successfully.",
        updateInfo
    });
});

// Delete all locations
app.delete("/locations/:id", async (req, res) => {
    const { id } = req.params;
    const getLocation = await Location.destroy({ where: { id } });
    if (!getLocation) {
        res.status(404).send({
            success: false,
            message: "The location with that id is not found"
        });
    };

    res.status(200).send({
        success: true,
        message: "Location deleted successfully."
    });
});

// Authenticate connection to the db
sequlize.authenticate().then(() => {
    console.log("Connection had been established successflly")
}).catch(err => {
    console.log(`Unable to connect to database and error is ${err}`)
})

app.listen(port, () => {
    console.log(`App is running at http://127.0.0.1:${port}`)
});

exports = module.exports = app;
