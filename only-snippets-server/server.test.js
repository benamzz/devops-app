const app = require('./app')
const http = require('http');

const PORT = process.env.PORT || 5005;

describe('App', () => {
    let server;

    beforeAll(() => {
        server = http.createServer(app);
        server.listen(PORT);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should start the server and listen on the specified port', (done) => {
        server.on('listening', () => {
            expect(server.listening).toBeTruthy();
            done();
        });
    });
});
