/* eslint-disable no-unused-vars */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

const SAMPLE_COURSE_ID = '1';

describe('/GET courses', () => {
    it('it should Get all courses', (done) => {
        chai.request('http://localhost:5000')
            .get('/courses')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/GET courses/:id', () => {
  it('it should Get a course by courseId', (done) => {
      chai.request('http://localhost:5000')
          .get('/courses/'+SAMPLE_COURSE_ID)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
          });
  });
});

describe('/GET courses:id/enrollments', () => {
  it('it should Get enrollments by courseId', (done) => {
      chai.request('http://localhost:5000')
          .get('/courses/'+SAMPLE_COURSE_ID+'/enrollments')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
          });
  });
});
