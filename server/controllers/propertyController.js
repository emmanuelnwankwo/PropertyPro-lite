/* eslint-disable camelcase */
import Authenticator from '../helper/authenticator';
import pool from '../config/connection';

const { decodeToken } = Authenticator;
const header = (req) => {
  const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
  const decoded = decodeToken(token);
  return decoded.payload;
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
    const owner = header(req).id;
    const owner_phone = header(req).phone_number;
    const owner_email = header(req).email;
    const client = await pool.connect();
    try {
      const {
        status, price, state, city, address, type, image_url, property_name, image_url_2, image_url_3, description, map_lat, map_lng, purpose,
      } = req.body;
      const sqlQuery = `INSERT INTO properties(owner, property_name, status, type, state, city, address, price, image_url, image_url_2, image_url_3, owner_email, owner_phone, purpose, description, map_lat, map_lng)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                    RETURNING *`;
      const values = [owner, property_name, status, type, state, city, address, price, image_url, image_url_2, image_url_3, owner_email, owner_phone, purpose, description, map_lat, map_lng];
      property = await client.query({ text: sqlQuery, values });
      if (property.rows && property.rowCount) {
        property = property.rows;
        return res.status(201).json({ status: 'success', data: property });
      }
    } catch (err) {
      return res.status(404).json({ status: 'error', error: 'User ID does not exists in database' });
    } finally {
      await client.release();
    }
    return null;
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
    const sqlQuery = `SELECT id, owner, property_name, status, type, state, city, address, price, image_url, image_url_2, image_url_3, owner_email, owner_phone, purpose, description, map_lat, map_lng, created_on
                    FROM properties ORDER BY created_on ASC`;
    const client = await pool.connect();
    try {
      property = await client.query(sqlQuery);
      return res.status(200).json({ status: 'success', data: property.rows });
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
    const { propertyId } = req.params;
    const client = await pool.connect();
    try {
      const sqlQuery = 'SELECT * FROM properties WHERE id = $1 LIMIT 1';
      const values = [propertyId];
      property = await client.query({ text: sqlQuery, values });
      if (property.rowCount) {
        return res.status(200).json({ status: 'success', data: property.rows[0] });
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
    const ownerId = header(req).id;
    const client = await pool.connect();
    const findOneQuery = 'SELECT * from properties WHERE id = $1 AND owner = $2';
    const sqlQuery = `UPDATE properties SET property_name = $1, status = $2, type = $3, state = $4, city = $5, address = $6, price = $7, image_url = $8, image_url_2 = $9, image_url_3 = $10, purpose = $11, description = $12, map_lat = $13, map_lng = $14
                      WHERE id = $15 AND owner = $16 RETURNING *`;
    try {
      property = await client.query(findOneQuery, [propertyId, ownerId]);
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
        ownerId,
      ];
      property = await client.query(sqlQuery, values);
      return res.status(200).json({ status: 'success', data: property.rows[0] });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
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
    const { propertyId } = req.params;
    const ownerId = header(req).id;
    const deleteQuery = 'DELETE FROM properties WHERE id = $1 AND owner = $2 RETURNING *';
    const client = await pool.connect();
    try {
      property = await client.query(deleteQuery, [propertyId, ownerId]);
      if (!property.rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Property Not Found' });
      }
      return res.status(200).json({ status: 'success', data: `Property with ID: ${propertyId} deleted` });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
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
    const { propertyId } = req.params;
    const ownerId = header(req).id;
    const findOneQuery = 'SELECT * from properties WHERE id = $1 AND owner = $2';
    const sqlQuery = 'UPDATE properties SET status = $1 WHERE id = $2 AND owner = $3 RETURNING *';
    const client = await pool.connect();
    try {
      property = await client.query(findOneQuery, [propertyId, ownerId]);
      if (!property.rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Property Not Found' });
      }
      const values = [req.body.status || property.rows[0].status, propertyId, ownerId];
      property = await client.query(sqlQuery, values);
      return res.status(200).json({ status: 'success', data: property.rows[0] });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
  }

  /**
     * Search properties by type
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof PropertyController
     */
  static async searchByType(req, res) {
    const { propertyType } = req.params;
    console.log(propertyType);
    const client = await pool.connect();
    try {
      const sqlQuery = 'SELECT * FROM properties WHERE type = $1 ORDER BY created_on DESC';
      const values = [propertyType];
      property = await client.query(sqlQuery, values);
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
