const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

// Set up chai
chai.should();
chai.use(chaiHttp);

describe("App tests", () => {

    const locationData = {
        name: "Kapsowar",
        femalePopulation: 20,
        malePopulation: 20
    }

    it('should return main page /', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should create new location', (done) => {
        const newLocationData = {
            name: "Eldoret",
            femalePopulation: 21,
            malePopulation: 21
        }
        chai.request(app)
            .post('/locations')
            .set('content-type', 'application/json')
            .send(newLocationData)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should return all locations and populations', (done) => {
        // Create a new contact
        chai.request(app)
            .post('/locations')
            .set('content-type', 'application/json')
            .send(locationData)
            .end();
        // Return contacts
        chai.request(app)
            .get('/locations')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should return single locations and its populations', (done) => {
        chai.request(app)
            .get(`/locations/1`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should update single location data', (done) => {
        // Create a new contact
        const dataUpdate = {
            name: "Nairobi",
            femalePopulation: 101,
            malePopulation: 67
        }
        chai.request(app)
            .put(`/locations/1`)
            .set('content-type', 'application/json')
            .send(dataUpdate)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should delete/remove a single location', async (done) => {

        chai.request(app)
            .delete('/locations/1')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

});
