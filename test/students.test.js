/* eslint-disable no-unused-vars */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const SAMPLE_STUDENT_ID = '1';

describe('/GET students', () => {
    it('it should Get all students', (done) => {
        chai.request('http://localhost:5000')
            .get('/students')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/GET students/:id', () => {
    it('it should Get a student by studentId', (done) => {
        chai.request('http://localhost:5000')
            .get('/students/' + SAMPLE_STUDENT_ID)
            .end((err, res) => {
                res.should.have.status(200);
                //   res.body.should.be.a('object');
                const response = res.body;
                expect(response).to.be.a('object');
                if (Object.hasOwnProperty.call(response, 'id')) {
                    expect(response.id).to.be.a('number');
                    expect(response.first_name).to.be.a('string');
                    expect(response.last_name).to.be.a('string');
                    expect(response.address).to.be.a('string');
                    expect(response.city).to.be.a('string');
                    expect(response.province).to.be.a('string');
                    expect(response.zip).to.be.a('string');
                    expect(response.dob).to.be.a('string');
                    expect(response.phone).to.be.a('string');
                    expect(response.mobile_phone).to.be.a('string');
                    expect(response.email).to.be.a('string');
                    expect(response.pic).to.be.a('string');
                }
                done();
            });
    });
});

describe('/GET students:id/enrollments', () => {
    it('it should Get enrollments by studentId', (done) => {
        chai.request('http://localhost:5000')
            .get('/students/' + SAMPLE_STUDENT_ID + '/enrollments')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
