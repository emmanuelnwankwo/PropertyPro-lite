/* eslint-disable camelcase */
import Authenticator from '../helper/authenticator';
import pool from '../config/connection';

const { decodeToken, generateToken } = Authenticator;
// const header = (req) => {
//   const token = req.headers.authorization.split(' ')[1] || req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
//   const decoded = decodeToken(token);
//   return decoded.payload;
// };
const header = (req) => {
  const token = req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
  return token;
};
let property;
/**
 * Defines methods for properties
 * @class PropertyController
 */
class PropertyController {
  /**
     * Creates a property
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async createProperty(req, res) {
    // const owner = header(req).id;
    // const owner_phone = header(req).phone_number;
    // const owner_email = header(req).email;
    // const token = req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
    const { token } = header(req);
  // const decoded = decodeToken(token);
  // const owner = decoded.payload.id; const owner_phone = decoded.payload.phone_number;
  //   const owner_email = decoded.payload.email;
    const client = await pool.connect();
    try {
      const {
        status, price, state, city, address, type, image_url, property_name, image_url_2, image_url_3, description, map_lat, map_lng, purpose,
      } = req.body;
      const sqlQuery = `INSERT INTO properties(type, state, city, address, price, image_url)
                    VALUES($1, $2, $3, $4, $5, $6)
                    RETURNING *`;
      const values = [type, state, city, address, price, image_url];
      property = await client.query({ text: sqlQuery, values });
      if (property.rows && property.rowCount) {
        property = property.rows[0];
        // const token = await generateToken(122);
        return res.status(201).json({ status: 'success', data: { token, id: property.id, status: property.status, type: property.type, state: property.state, city: property.city, address: property.address, price: property.price, image_url: property.image_url } });
      }
    } catch (err) {
      return res.status(404).json({ status: 'error', error: 'User ID does not exists in database' });
    } finally {
      await client.release();
    }
    // return null;
  }

  /**
     * Get all properties
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async getProperties(req, res) {
    // const owner = header(req).id; const owner_phone = header(req).phone_number;
    // const owner_email = header(req).email;
    // const token = req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
    const { token } = header(req);
  // const decoded = decodeToken(token);
  // // const owner = decoded.payload.id; const owner_phone = decoded.payload.phone_number;
  //   const owner_email = decoded.payload.email;
    const { type } = req.query;
    const sqlQuery = 'SELECT * FROM properties ORDER BY created_on ASC';
    const sqlQueryType = 'SELECT * FROM properties WHERE type = $1 ORDER BY created_on DESC';
    const client = await pool.connect();
    try {
      property = await client.query(sqlQuery);
      if (type) {
        property = await client.query(sqlQueryType, [type]);
      }
      if (property.rowCount) {
        // const token = await generateToken(122);
        property = property.rows;
        // const { owner_email } = req.body;
        return res.status(200).json({ status: 'success', data: token, property });
      }
      return res.status(404).json({ status: 'error', error: 'Property Not Found' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * Get a specific property
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async getProperty(req, res) {
    // const owner = header(req).id; const owner_phone = header(req).phone_number;
    // const owner_email = header(req).email;
    const { token } = header(req);
    // const token = req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
    const { propertyId } = req.params;
    const client = await pool.connect();
    try {
      const sqlQuery = 'SELECT * FROM properties WHERE id = $1 LIMIT 1';
      const values = [propertyId];
      property = await client.query({ text: sqlQuery, values });
      if (property.rowCount) {
        property = property.rows[0];
        // const token = await generateToken(122);
        return res.status(200).json({ status: 'success', data: { token, status: property.status } });
      }
      return res.status(404).json({ status: 'error', error: 'Property Not Found' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * Update a property
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async updateProperty(req, res) {
    const { propertyId } = req.params;
    // const ownerId = header(req).id;
    // const token = req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
    const { token } = header(req);
    const client = await pool.connect();
    const findOneQuery = 'SELECT * from properties WHERE id = $1';
    const sqlQuery = `UPDATE properties SET property_name = $1, status = $2, type = $3, state = $4, city = $5, address = $6, price = $7, image_url = $8, image_url_2 = $9, image_url_3 = $10, purpose = $11, description = $12, map_lat = $13, map_lng = $14
                      WHERE id = $15 RETURNING *`;
    try {
      property = await client.query(findOneQuery, [propertyId]);
      if (!property.rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Property Not Found' });
      }
      const values = [
        req.body.property_name || property.rows[0].property_name,
        req.body.status || property.rows[0].status,
        req.body.type || property.rows[0].type,
        req.body.state || property.rows[0].state,
        req.body.city || property.rows[0].city,
        req.body.address || property.rows[0].address,
        req.body.price || property.rows[0].price,
        req.body.image_url || property.rows[0].image_url,
        req.body.image_url_2 || property.rows[0].image_url_2,
        req.body.image_url_3 || property.rows[0].image_url_3,
        req.body.purpose || property.rows[0].purpose,
        req.body.description || property.rows[0].description,
        req.body.map_lat || property.rows[0].map_lat,
        req.body.map_lng || property.rows[0].map_lng,
        propertyId,
      ];
      property = await client.query(sqlQuery, values);
      property = property.rows[0];
      return res.status(200).json({ status: 'success', data: { token, price: property.price } });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * Delete a property
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async deleteProperty(req, res) {
    // const owner = header(req).id; const owner_phone = header(req).phone_number;
    // const owner_email = header(req).email;
    // const token = req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
    const { token } = header(req);
    const { propertyId } = req.params;
    // const ownerId = header(req).id;
    const deleteQuery = 'DELETE FROM properties WHERE id = $1 RETURNING *';
    const client = await pool.connect();
    try {
      property = await client.query(deleteQuery, [propertyId]);
      if (!property.rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Property Not Found' });
      }
      // const token = await generateToken(122);
      return res.status(200).json({ status: 'success', data: { token, message: `Property with ID: ${propertyId} deleted` } });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * Mark a property sold/available
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async markProperty(req, res) {
    // const owner_phone = header(req).phone_number;
    // const owner_email = header(req).email;
    // const token = req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
    const { token } = header(req);
    const { propertyId } = req.params;
    // const ownerId = header(req).id;
    const findOneQuery = 'SELECT * from properties WHERE id = $1';
    const sqlQuery = 'UPDATE properties SET status = $1 WHERE id = $2 RETURNING *';
    const client = await pool.connect();
    try {
      property = await client.query(findOneQuery, [propertyId]);
      if (!property.rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Property Not Found' });
      }
      const values = [req.body.status || property.rows[0].status, propertyId];
      property = await client.query(sqlQuery, values);
      const propert = property.rows[0];
      // const token = await generateToken(122);
      return res.status(200).json({ status: 'success', data: { token, created_on: propert.created_on } });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * Edit property price
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async editPropertyPrice(req, res) {
    // const owner_phone = header(req).phone_number;
    // const owner_email = header(req).email;
    const { propertyId } = req.params;
    // const ownerId = header(req).id;
    const findOneQuery = 'SELECT * from properties WHERE id = $1';
    const sqlQuery = 'UPDATE properties SET price = $1 WHERE id = $2 RETURNING *';
    const client = await pool.connect();
    try {
      property = await client.query(findOneQuery, [propertyId]);
      if (!property.rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Property Not Found' });
      }
      const values = [req.body.price || property.rows[0].price, propertyId];
      property = await client.query(sqlQuery, values);
      const token = await generateToken(122);
      return res.status(200).json({ status: 'success', data: [token, property.rows[0]] });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * Get properties under an Agent
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async getPropertiesByAgent(req, res) {
    // const ownerId = header(req).id;
    const sqlQuery = 'SELECT * FROM properties WHERE owner = $1 ORDER BY created_on ASC';
    const client = await pool.connect();
    try {
      property = await client.query(sqlQuery, [1]);
      if (property.rowCount) {
        return res.status(200).json({ status: 'success', data: property.rows });
      }
      return res.status(404).json({ status: 'error', error: 'Property Not Found' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }
}

export default PropertyController;
