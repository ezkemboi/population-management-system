const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var Location = require("./db");

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
    try {
        const locationDetails = await Location.create({
            name: name,
            totalfemale: femalePopulation,
            totalmale: malePopulation,
            total: totalPopulation
        });
        res.status(201).send({
            success: true,
            message: "Location created successfully.",
            locationDetails
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get all locations
app.get('/locations', async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json(err)
    }

});

// Get single location details 
app.get('/locations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Location.findOne({ where: { id } });
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
    } catch (err) {
        res.status(500).json(err)
    }
});

// Edit location
app.put('/locations/:id', async (req, res) => {
    const { name, femalePopulation, malePopulation } = req.body;
    const { id } = req.params;
    const totalPopulation = femalePopulation + malePopulation;
    const data = {
        name,
        totalfemale: femalePopulation,
        totalmale: malePopulation,
        total: totalPopulation
    }
    try {
        const updateLocationInfo = await Location.update({ data }, { where: { id } });

        if (!updateLocationInfo) {
            res.status(404).send({
                success: false,
                message: "Location not found"
            });
        };

        res.status(200).send({
            success: true,
            message: "Location's details Updated successfully.",
            updateLocationInfo: data
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// Delete all locations
app.delete("/locations/:id", async (req, res) => {
    const { id } = req.params;
    try {
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
    } catch (err) {
        res.status(500).json(err)
    }
});

app.listen(port, () => {
    console.log(`App is running at http://127.0.0.1:${port}`)
});

exports = module.exports = app;
