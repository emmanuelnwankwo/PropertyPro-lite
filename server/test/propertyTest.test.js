import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../server';

chai.use(chaiHTTP);
const { expect } = chai;
const propertyUrl = '/api/v1/property';
const authBaseUrl = '/api/v1/auth';
const newProperty = {
  property_name: 'Test Property',
  status: 'avaliable',
  price: '500',
  state: 'Lagos',
  city: 'Test city',
  address: 'Test address',
  type: '1_Bedroom',
  image_url: 'Test.png',
  description: 'Test Description',
  purpose: 'For Sale',
};
const user = {
  email: 'testt@gmail.com',
  first_name: 'First Name',
  last_name: 'Second Name',
  password: 'testpass123',
  phone_number: '07000000200',
  address: 'Test Address',
  user_type: 'agent',
  passport_url: 'https://example.com/avatar.png',
  is_admin: 'false',
};
let propertyId = '';
let token = '';

/* eslint-disable no-undef */
describe('Test Property Endpoints', () => {
  describe('POST REQUESTS', () => {
    it('It should create a User account', (done) => {
      chai
        .request(app)
        .post(`${authBaseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql('success');
          // eslint-disable-next-line no-unused-expressions
          expect(res.body.data[0].token).to.exist;
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data[0].token;
          done();
        });
    });
    it('It should create a new property', (done) => {
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.data[0].property_name).to.eql(newProperty.property_name);
          expect(res.body.data[0].status).to.eql(newProperty.status);
          expect(res.body.data[0].price).to.eql(500);
          expect(res.body.data[0].state).to.eql(newProperty.state);
          expect(res.body.data[0].city).to.eql(newProperty.city);
          expect(res.body.data[0].address).to.eql(newProperty.address);
          expect(res.body.data[0].type).to.eql(newProperty.type);
          expect(res.body.data[0].image_url).to.eql(newProperty.image_url);
          expect(res.body.data[0].description).to.eql(newProperty.description);
          expect(res.body.data[0].purpose).to.eql(newProperty.purpose);
          propertyId = res.body.data[0].id;
          done();
        });
    });
    it('It should ensure that property name is not empty', (done) => {
      newProperty.property_name = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.property_name).to.eql('The property name is required');
          done();
        });
    });
    it('It should ensure that property status is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('The property status is required');
          done();
        });
    });
    it('It should ensure that property price is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = 'avaliable';
      newProperty.price = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.price).to.eql('The property price is required');
          done();
        });
    });
    it('It should ensure that property state is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = 'avaliable';
      newProperty.price = '5000';
      newProperty.state = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.state).to.eql('The property state is required');
          done();
        });
    });
    it('It should ensure that property city is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = 'avaliable';
      newProperty.price = '5000';
      newProperty.state = 'Lagos';
      newProperty.city = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.city).to.eql('The property city is required');
          done();
        });
    });
    it('It should ensure that property address is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = 'avaliable';
      newProperty.price = '5000';
      newProperty.state = 'Lagos';
      newProperty.city = 'Lekki';
      newProperty.address = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.address).to.eql('The property address is required');
          done();
        });
    });
    it('It should ensure that property type is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = 'avaliable';
      newProperty.price = '5000';
      newProperty.state = 'Lagos';
      newProperty.city = 'Lekki';
      newProperty.address = 'Test Address';
      newProperty.type = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.type).to.eql('The property type is required');
          done();
        });
    });
    it('It should ensure that property image is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = 'avaliable';
      newProperty.price = '5000';
      newProperty.state = 'Lagos';
      newProperty.city = 'Lekki';
      newProperty.address = 'Test Address';
      newProperty.type = '1_bedroom';
      newProperty.image_url = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.image_url).to.eql('The property image is required');
          done();
        });
    });
    it('It should ensure that property description is not empty', (done) => {
      newProperty.property_name = 'Test Property';
      newProperty.status = 'avaliable';
      newProperty.price = '5000';
      newProperty.state = 'Lagos';
      newProperty.city = 'Lekki';
      newProperty.address = 'Test Address';
      newProperty.type = '1_bedroom';
      newProperty.image_url = 'Test.png';
      newProperty.description = '';
      chai.request(app)
        .post(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.description).to.eql('The property description is required');
          done();
        });
    });
  });
  describe('GET REQUESTS', () => {
    it('It should throw 404 if the property with the ID dose not exist', (done) => {
      const propertId = 20;
      chai.request(app)
        .get(`${propertyUrl}/${propertId}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.eql('Property Not Found');
          done();
        });
    });
    it('It should return a specific property details in the database', (done) => {
      chai.request(app)
        .get(`${propertyUrl}/${propertyId}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
    it('It should return the array of all properties', (done) => {
      chai.request(app)
        .get(propertyUrl)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
    it('It should return the array of the same property type', (done) => {
      const propertyType = '1_Bedroom';
      chai.request(app)
        .get(`${propertyUrl}/search/${propertyType}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
    it('should respond with status code 404 if route is not defined ', (done) => {
      chai.request(app)
        .get('/via')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.eql('Endpoint Not Found');
          done();
        });
    });
  });
  describe('PATCH REQUESTS', () => {
    it('It should update the property with the new name', (done) => {
      const property = {
        property_name: 'Second Test Property Name',
        status: 'avaliable',
        price: '500.00',
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
        image_url_2: '',
        map_lat: '6.43',
        map_lng: '21.67',
      };
      chai.request(app)
        .patch(`${propertyUrl}/${propertyId}`)
        .set('authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
    it('It should update the property status to SOLD or AVAILABLE', (done) => {
      newProperty.status = 'sold';
      chai.request(app)
        .patch(`${propertyUrl}/${propertyId}/sold`)
        .set('authorization', `Bearer ${token}`)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.status).to.eql(newProperty.status);
          done();
        });
    });
  });
  describe('DELETE REQUESTS', () => {
    it('It should throw NOT FOUND if the property does not exist', (done) => {
      const propertId = 200;
      chai.request(app)
        .delete(`${propertyUrl}/${propertId}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.eql('Property Not Found');
          done();
        });
    });
    it('Should delete the property', (done) => {
      chai.request(app)
        .delete(`${propertyUrl}/${propertyId}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
    it('It should throw 404 if the URL is incorrect', (done) => {
      chai.request(app)
        .delete(`${propertyUrl}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
