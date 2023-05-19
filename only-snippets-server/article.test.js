const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const { expect } = chai;
chai.use(chaiHttp);

describe('Authentification', function () {
    this.timeout(10000);
    let agent;
    let authToken;

    it('devrait authentifier un utilisateur', function (done) {
        agent = chai.request.agent(app);
        agent
            .post('/api/sessions')
            .send({ email: 'test@gmail.com', password: 'Azerty123' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                authToken = res.body.authToken;
                done();
            });
    });
});

describe('Création d\'un article', function () {
    this.timeout(10000);
    let agent;
    let authToken;

    before(function (done) {
        agent = chai.request.agent(app);
        agent
            .post('/api/sessions')
            .send({ email: 'test@gmail.com', password: 'Azerty123' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                authToken = res.body.authToken;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('devrait créer un nouvel article', function (done) {
        agent
            .post('/api/articles')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: 'Contenu de l\'article' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
