import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../server';

chai.use(chaiHTTP);
const { expect } = chai;
const propertyUrl = '/api/v1/property';

/* eslint-disable no-undef */
describe('Test Property Endpoints', () => {
  describe('POST REQUESTS', () => {
    it('It should create a new property', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: 500.00,
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.data[0].property_name).to.eql(newProperty.property_name);
          expect(res.body.data[0].status).to.eql(newProperty.status);
          expect(res.body.data[0].price).to.eql(newProperty.price);
          expect(res.body.data[0].state).to.eql(newProperty.state);
          expect(res.body.data[0].city).to.eql(newProperty.city);
          expect(res.body.data[0].address).to.eql(newProperty.address);
          expect(res.body.data[0].type).to.eql(newProperty.type);
          expect(res.body.data[0].image_url).to.eql(newProperty.image_url);
          expect(res.body.data[0].description).to.eql(newProperty.description);
          expect(res.body.data[0].purpose).to.eql(newProperty.purpose);
          done();
        });
    });
    it('It should ensure that property name is not empty', (done) => {
      const newProperty = {
        property_name: '',
        status: 'avaliable',
        price: 500.00,
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property name is required');
          done();
        });
    });
    it('It should ensure that property status is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: '',
        price: 500.00,
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property status is required');
          done();
        });
    });
    it('It should ensure that property price is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: '',
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property price is required');
          done();
        });
    });
    it('It should ensure that property state is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: 500.00,
        state: '',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property state is required');
          done();
        });
    });
    it('It should ensure that property city is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: 500.00,
        state: 'Lagos',
        city: '',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property city is required');
          done();
        });
    });
    it('It should ensure that property address is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: 500.00,
        state: 'Lagos',
        city: 'Test city',
        address: '',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property address is required');
          done();
        });
    });
    it('It should ensure that property type is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: 500.00,
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '',
        image_url: 'Test.png',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property type is required');
          done();
        });
    });
    it('It should ensure that property image is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: 500.00,
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: '',
        description: 'Test Description',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property image is required');
          done();
        });
    });
    it('It should ensure that property description is not empty', (done) => {
      const newProperty = {
        property_name: 'Test Property',
        status: 'avaliable',
        price: 500.00,
        state: 'Lagos',
        city: 'Test city',
        address: 'Test address',
        type: '1 Bedroom',
        image_url: 'Test.png',
        description: '',
        purpose: 'For Sale',
      };
      chai.request(app)
        .post(propertyUrl)
        .send(newProperty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('The property description is required');
          done();
        });
    });
    // it('It should ensure that property does not already exits in the database', (done) => {
    //     const newProperty = {
    //         property_name: 'Test Property',
    //         status: 'avaliable',
    //         price: 500.00,
    //         state: 'Lagos',
    //         city: 'Test city',
    //         address: 'Test address',
    //         type: '1 Bedroom',
    //         image_url: 'Test.png',
    //         description: 'Test Description',
    //         purpose: 'For Sale'
    //     };
    //     chai.request(app)
    //         .post(propertyUrl)
    //         .send(newProperty)
    //         .end((err, res) => {
    //             expect(res).to.have.status(409);
    //             expect(res.body.error).to.eql('The property already exists');
    //             done();
    //         });
    // });
  });
  describe('GET REQUESTS', () => {
    // it('It should return NOT FOUND if the property with the ID dose not exist', (done) => {
    //     const id = 2;
    //     chai.request(app)
    //         .get(`${propertyUrl}/${id}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             expect(res.body.error).to.eql(`Property with ID: ${id} NOT FOUND`);
    //             done();
    //         });
    // });
    // it('It should return the property details if it exists', (done) => {
    //     const id = 1;
    //     chai.request(app)
    //         .get(`${propertyUrl}/:${id}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body.data.property_name).to.eql(property_name);
    //             expect(res.body.data.status).to.eql(status);
    //             expect(res.body.data.price).to.eql(price);
    //             done();
    //         });
    // });
    it('It should return the array of all properties', (done) => {
      chai.request(app)
        .get(propertyUrl)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          expect(res.body.data[0].property_name).to.eql('Test Property');
          expect(res.body.data[0].status).to.eql('avaliable');
          expect(res.body.data[0].price).to.eql(500.00);
          expect(res.body.data[0].state).to.eql('Lagos');
          expect(res.body.data[0].city).to.eql('Test city');
          expect(res.body.data[0].address).to.eql('Test address');
          expect(res.body.data[0].type).to.eql('1 Bedroom');
          expect(res.body.data[0].image_url).to.eql('Test.png');
          expect(res.body.data[0].description).to.eql('Test Description');
          expect(res.body.data[0].purpose).to.eql('For Sale');
          done();
        });
    });
  });
});