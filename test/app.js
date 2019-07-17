const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

// Set up chai
chai.should();
chai.use(chaiHttp);

describe("App tests", () => {

    it('should return main page /', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
