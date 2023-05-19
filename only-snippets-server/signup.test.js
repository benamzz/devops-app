const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

// Configurer Chai
chai.use(chaiHttp);
const expect = chai.expect;

describe('Integration Tests for /api/users', () => {
    it('should create a new user and return a 201 status', (done) => {
        chai
            .request(app)
            .post('/api/users')
            .send({
                email: 'test@example.com',
                password: 'Test1234',
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('email', 'test@example.com');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('username');
                done();
            });
    });

    it('should return a 400 status and an error message for invalid data', (done) => {
        chai
            .request(app)
            .post('/api/users')
            .send({
                email: 'invalid-email',
                password: 'short',
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
