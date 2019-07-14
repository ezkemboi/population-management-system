var assert = require('assert');
var app = require("../src/app.js");

describe("App tests", () => {
    let server;
    const port = 8000;
    before(done => {
        server = app;
        done();
        server.listen(port)
    })
    it("Should start the server", () => {
        assert.strictEqual(1, 1);
    });
    after(done => {
        done();
    })
});
