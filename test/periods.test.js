/* eslint-disable no-unused-vars */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('/GET periods', () => {
    it('it should Get all periods', (done) => {
        chai.request('http://localhost:5000')
            .get('/periods')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
