/* eslint-disable no-undef */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import uuid from 'uuid';
import app from '../server';

chai.use(chaiHTTP);
const { expect } = chai;
const authBaseUrl = '/api/v1/auth';

describe('Test User Endpoints', () => {
  describe('POST REQUESTS', () => {
    it('It should create a User account', (done) => {
      const user = {
        id: uuid.v4(),
        email: 'test@gmail.com',
        firstName: 'First Name',
        lastName: 'Second Name',
        password: 'testpass',
        phoneNumber: '070000000',
        address: 'Test Address',
        isAdmin: false,
      };
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
    it('It should return User already exits in the database', (done) => {
      const user = {
        id: uuid.v4(),
        email: 'test@gmail.com',
        firstName: 'First Name',
        lastName: 'Second Name',
        password: 'testpass',
        phoneNumber: '07000000',
        address: 'Test Address',
        isAdmin: false,
      };
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('User already exist');
          done();
        });
    });
    it('It should return Phone Number already exits in the database', (done) => {
      const user = {
        id: uuid.v4(),
        email: 'test2@gmail.com',
        firstName: 'First Name',
        lastName: 'Second Name',
        password: 'testpass',
        phoneNumber: '070000000',
        address: 'Test Address',
        isAdmin: false,
      };
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('Phone number already exist in the database');
          done();
        });
    });
    // it('It should login the User if the account exists', (done) => {
    //     const user = {
    //         email: 'test@gmail.com',
    //         password: 'testpass'
    //     };
    //     chai.request(app)
    //         .post(`${authBaseUrl}/login`)
    //         .send(user)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body.status).to.eql('success');
    //             done();
    //         });
    // });
    // it('It should return Password NOT FOUND if the password is incorrect', (done) => {
    //     const user = {
    //         email: 'test@gmail.com',
    //         password: 'pass'
    //     };
    //     chai.request(app)
    //         .post(`${authBaseUrl}/login`)
    //         .send(user)
    //         .end((err, res) => {
    //             expect(res).to.have.status(401);
    //             expect(res.body.status).to.eql('error');
    //             expect(res.body.error).to.eql('Password is not correct');
    //             done();
    //         });
    // });
    // it('It should return User NOT FOUND if the User account does not exist', (done) => {
    //     const user = {
    //         email: 'test1@gmail.com',
    //         password: 'testpass'
    //     };
    //     chai.request(app)
    //         .post(`${authBaseUrl}/login`)
    //         .send(user)
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             expect(res.body.status).to.eql('error');
    //             expect(res.body.error).to.eql('User does not exists');
    //             done();
    //         });
    // });
  });
});
