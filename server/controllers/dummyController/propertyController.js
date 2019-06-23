import PropertyModel from '../../models/dummyModel/propertyModel';

class PropertyController {
  static createProperty(req, res) {
    const {
      owner, status, price, state, city, address, type, image_url, property_name, image_url2, owner_phone, description, map_lat, map_lng, purpose
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
      map_lat
    };
    PropertyModel.push(newProperty);
    return res.status(201).json({
      status: 'success',
      data: [PropertyModel],
    });
  }

  static getProperties(req, res) {
    return res.status(200).json({
      status: 'success',
      data: PropertyModel,
    });
  }



}
export default PropertyController;
