/* eslint-disable no-unused-vars */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

const SAMPLE_ENROLLMENT_ID = '1';

// describe('/GET enrollments', () => {
//     it('it should Get all enrollments', (done) => {
//         chai.request('http://localhost:5000')
//             .get('/enrollments')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 done();
//             });
//     });
// });

// describe('/GET enrollments/:id', () => {
//   it('it should Get an enrollment by enrollmentId', (done) => {
//       chai.request('http://localhost:5000')
//           .get('/enrollments/'+SAMPLE_ENROLLMENT_ID)
//           .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               done();
//           });
//   });
// });
