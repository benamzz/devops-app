const request = require("supertest");
const app = require("./app");

describe("Server", () => {
    let server;

    beforeAll((done) => {
        server = app.listen(5005, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    test("should start the server and listen on the specified port", async () => {
        expect(server.address().port).toBe(5005);
    });
});
