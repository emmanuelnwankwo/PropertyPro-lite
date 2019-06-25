import PropertyModel from '../../models/dummyModel/propertyModel';
/* eslint-disable camelcase */
class PropertyController {
  static createProperty(req, res) {
    const {
      owner, status, price, state, city, address, type, image_url, property_name, image_url2, owner_phone, description, map_lat, map_lng, purpose,
    } = req.body;
    const id = PropertyModel.length + 1;
    const created_on = new Date().toLocaleString().replace(',', '').replace(/:.. /, ' ');
    const newProperty = {
      id,
      owner,
      property_name,
      status,
      price,
      state,
      city,
      address,
      type,
      created_on,
      image_url,
      image_url2,
      description,
      owner_phone,
      purpose,
      map_lng,
      map_lat,
    };
    PropertyModel.push(newProperty);
    if (!property_name) {
      return res.status(400).json({
        status: 'error',
        error: 'The property name is required',
      });
    }
    if (!status) {
      return res.status(400).json({
        status: 'error',
        error: 'The property status is required',
      });
    }
    if (!price) {
      return res.status(400).json({
        status: 'error',
        error: 'The property price is required',
      });
    }
    if (!state) {
      return res.status(400).json({
        status: 'error',
        error: 'The property state is required',
      });
    }
    if (!city) {
      return res.status(400).json({
        status: 'error',
        error: 'The property city is required',
      });
    }
    if (!address) {
      return res.status(400).json({
        status: 'error',
        error: 'The property address is required',
      });
    }
    if (!type) {
      return res.status(400).json({
        status: 'error',
        error: 'The property type is required',
      });
    }
    if (!image_url) {
      return res.status(400).json({
        status: 'error',
        error: 'The property image is required',
      });
    }
    if (!description) {
      return res.status(400).json({
        status: 'error',
        error: 'The property description is required',
      });
    }
    return res.status(201).json({
      status: 'success',
      data: PropertyModel,
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
    const property = PropertyModel.find(propert => propert.id === Number(propertyId));
    if (!property) {
      return res.status(404).json({
        status: 'error',
        error: `Property with ID: ${propertyId} NOT FOUND`,
      });
    }
    return res.status(200).json({
      status: 'success',
      data: property,
    });
  }

  static deleteProperty(req, res) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(propert => propert.id === Number(propertyId));
    const index = PropertyModel.indexOf(property);
    if (isNaN(propertyId)) {
      return res.status(404).json({
        status: 'error',
        error: `Property ID: ${propertyId} must be an integer`,
      });
    }
    if (!property) {
      return res.status(404).json({
        status: 'error',
        error: `Property ID: ${propertyId} NOT FOUND`,
      });
    }
    PropertyModel.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      data: `property with ID: ${propertyId} deleted`,
    });
  }

  static updateProperty(req, res) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(propert => propert.id === Number(propertyId));
    const {
      property_name, status, price, state, city, address, type, image_url, image_url2, map_lat, map_lng, description, purpose,
    } = req.body;
    if (isNaN(propertyId)) {
      return res.status(404).json({
        status: 'error',
        error: `Property ID: ${propertyId} must be an integer`,
      });
    }
    if (!property) {
      return res.status(404).json({
        status: 'error',
        error: `property ID: ${propertyId} NOT FOUND`,
      });
    }
    property.property_name = property_name;
    property.status = status;
    property.price = price;
    property.state = state;
    property.city = city;
    property.address = address;
    property.type = type;
    property.image_url = image_url;
    property.image_url2 = image_url2;
    property.map_lat = map_lat;
    property.map_lng = map_lng;
    property.description = description;
    property.purpose = purpose;
    return res.status(200).json({
      status: 'success',
      data: property,
    });
  }
  static markProperty(req, res) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(propert => propert.id === Number(propertyId));
    const {
      status
    } = req.body;
    if (isNaN(propertyId)) {
      return res.status(404).json({
        status: 'error',
        error: `Property ID: ${propertyId} must be an integer`,
      });
    }
    if (!property) {
      return res.status(404).json({
        status: 'error',
        error: `property ID: ${propertyId} NOT FOUND`,
      });
    }
    property.status = status;
    return res.status(200).json({
      status: 'success',
      data: property,
    });
  }
}
export default PropertyController;
