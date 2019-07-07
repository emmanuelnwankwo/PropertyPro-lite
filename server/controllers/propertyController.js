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
    const ownerPhone = header(req).phoneNumber;
    const ownerEmail = header(req).email;
    const client = await pool.connect();
    try {
      const {
        status, price, state, city, address, type, imageUrl, propertyName, imageUrl2, imageUrl3, description, mapLat, mapLng, purpose,
      } = req.body;
      const sqlQuery = `INSERT INTO properties(owner, propertyName, status, type, state, city, address, price, imageUrl, imageUrl2, imageUrl3, ownerEmail, ownerPhone, purpose, description, mapLat, mapLng)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                    RETURNING *`;
      const values = [owner, propertyName, status, type, state, city, address, price, imageUrl, imageUrl2, imageUrl3, ownerEmail, ownerPhone, purpose, description, mapLat, mapLng];
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
    const sqlQuery = `SELECT id, owner, propertyname, status, type, state, city, address, price, imageurl, imageurl2, imageurl3, owneremail, ownerphone, purpose, description, maplat, maplng, createdon
                    FROM properties ORDER BY createdon ASC`;
    let properties;
    const client = await pool.connect();
    try {
      properties = await client.query(sqlQuery);
      return res.status(200).json({ status: 'success', data: properties.rows });
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
        return res.status(200).json({ status: 'Success', data: property.rows[0] });
      }
      return res.status(404).json({ status: 'error', error: `Property with ID: ${propertyId} NOT FOUND` });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }
}

export default PropertyController;
