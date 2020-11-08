/* eslint-disable no-unused-vars */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

const SAMPLE_TEACHER_ID = '1';

describe('/GET teachers', () => {
    it('it should Get all teachers', (done) => {
        chai.request('http://localhost:5000')
            .get('/teachers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/GET teachers/:id', () => {
    it('it should Get a teacher by teacherId', (done) => {
        chai.request('http://localhost:5000')
            .get('/teachers/' + SAMPLE_TEACHER_ID)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/GET teachers:id/courses', () => {
    it('it should Get courses by teacherId', (done) => {
        chai.request('http://localhost:5000')
            .get('/teachers/' + SAMPLE_TEACHER_ID + '/courses')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
