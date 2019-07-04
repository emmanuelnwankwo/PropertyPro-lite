import uuid from 'uuid';
import Authenticator from '../../helper/authenticator';
import PropertyModel from '../../models/dummyModel/propertyModel';

const { decodeToken } = Authenticator;
class PropertyController {
  static createProperty(req, res) {
    const {
      status, price, state, city, address, type, imageUrl, propertyName, imageUrl2, description, mapLat, mapLng, purpose,
    } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = decodeToken(token);
    const owner = decoded.payload.id;
    const ownerPhone = decoded.payload.phoneNumber;
    const createdOn = new Date()
      .toLocaleString()
      .replace(',', '')
      .replace(/:.. /, ' ');
    const property = {
      id: uuid.v4(), owner, propertyName, status, price, state, city, address, type, createdOn, imageUrl, imageUrl2, description, ownerPhone, purpose, mapLng, mapLat,
    };
    PropertyModel.push(property);
    return res.status(201).json({
      status: 'success',
      data: property,
    });
  }

  static getProperties(req, res) {
    return res.status(200).json({
      status: 'success',
      data: PropertyModel,
    });
  }

  static getProperty(req, res) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(
      propert => propert.id === propertyId,
    );
    return res.status(200).json({
      status: 'success',
      data: property,
    });
  }

  static deleteProperty(req, res) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(
      propert => propert.id === propertyId,
    );
    const index = PropertyModel.indexOf(property);
    PropertyModel.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      data: `property with ID: ${propertyId} deleted`,
    });
  }

  static updateProperty(req, res) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(
      propert => propert.id === propertyId,
    );
    const {
      propertyName, status, price, state, city, address, type, imageUrl, imageUrl2, mapLat, mapLng, description, purpose,
    } = req.body;
    property.propertyName = propertyName;
    property.status = status;
    property.price = price;
    property.state = state;
    property.city = city;
    property.address = address;
    property.type = type;
    property.imageUrl = imageUrl;
    property.imageUrl2 = imageUrl2;
    property.mapLat = mapLat;
    property.mapLng = mapLng;
    property.description = description;
    property.purpose = purpose;
    return res.status(200).json({
      status: 'success',
      data: property,
    });
  }

  static markProperty(req, res) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(
      propert => propert.id === propertyId,
    );
    const { status } = req.body;
    property.status = status;
    return res.status(200).json({
      status: 'success',
      data: property,
    });
  }

  static typeProperty(req, res) {
    const { propertyType } = req.params;
    const property = PropertyModel.filter(
      propert => propert.type === propertyType,
    );
    if (property.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: `property TYPE: ${propertyType} NOT FOUND`,
      });
    }
    return res.status(200).json({
      status: 'success',
      data: property,
    });
  }
}
export default PropertyController;
