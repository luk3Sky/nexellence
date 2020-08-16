/* eslint-disable no-unused-vars */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
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
          .get('/students/'+SAMPLE_STUDENT_ID)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
          });
  });
});

describe('/GET students:id/enrollments', () => {
  it('it should Get enrollments by studentId', (done) => {
      chai.request('http://localhost:5000')
          .get('/students/'+SAMPLE_STUDENT_ID+'/enrollments')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
          });
  });
});
