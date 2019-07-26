/* eslint-disable no-undef */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../server';

chai.use(chaiHTTP);
const { expect } = chai;
const authBaseUrl = '/api/v1/auth';
const user = {
  email: 'test@gmail.com',
  first_name: 'First Name',
  last_name: 'Second Name',
  password: 'testpass123',
  phone_number: '07020000000',
  address: 'Test Address',
  user_type: 'agent',
  passport_url: 'https://example.com/avatar.png',
  is_admin: 'true',
};
let userId;
let token;

describe('Test User Endpoints', () => {
  describe('POST REQUESTS', () => {
    it('It should create a User account', (done) => {
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql('success');
          userId = res.body.data.user.id;
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
          done();
        });
    });
    it('It should return User already exits in the database', (done) => {
      user.email = 'test@gmail.com';
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.eql(409);
          done();
        });
    });
    it('Should throw 400 if email is empty', (done) => {
      user.email = '';
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error.email).to.eql('Email is required');
          done();
        });
    });
    it('Should throw 400 if First Name is empty', (done) => {
      user.email = 'test@gmail.com';
      user.first_name = '';
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error.first_name).to.eql('First Name is required');
          done();
        });
    });
    it('Should throw 400 if Last Name is empty', (done) => {
      user.email = 'test@gmail.com';
      user.first_name = 'First Name';
      user.last_name = '';
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error.last_name).to.eql('Last Name is required');
          done();
        });
    });
    it('Should throw 400 if Password is empty', (done) => {
      user.email = 'test@gmail.com';
      user.first_name = 'First Name';
      user.last_name = 'Last Name';
      user.password = '';
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error.password).to.eql('Password is required');
          done();
        });
    });
    it('Should throw 400 if Phone Number is empty', (done) => {
      user.email = 'test@gmail.com';
      user.first_name = 'First Name';
      user.last_name = 'Last Name';
      user.password = 'testpass123';
      user.phone_number = '';
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error.phone_number).to.eql('Phone number is required');
          done();
        });
    });
    it('It should return Password is incorrect', (done) => {
      user.email = 'test@gmail.com';
      user.password = 'pass1234';
      chai.request(app)
        .post(`${authBaseUrl}/signin`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.eql(401);
          expect(res.body.error).to.eql('Password is not correct');
          done();
        });
    });
    it('It should return Error, User account does not exist', (done) => {
      user.email = 'test1@gmail.com';
      user.password = 'testpass123';
      chai.request(app)
        .post(`${authBaseUrl}/signin`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('User does not exists');
          done();
        });
    });
    it('It should login the User', (done) => {
      user.email = 'test@gmail.com';
      user.password = 'testpass123';
      chai.request(app)
        .post(`${authBaseUrl}/signin`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('Login successful');
          done();
        });
    });
  });
  describe('GET REQUESTS', () => {
    it('It should return list of all users', (done) => {
      chai.request(app)
        .get('/api/v1/admin')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
  });
  describe('DELETE REQUESTS', () => {
    it('Should delete the user', (done) => {
      chai.request(app)
        .delete(`/api/v1/admin/${userId}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
  });
});
