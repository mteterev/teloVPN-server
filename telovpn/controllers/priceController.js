const db = require('../db');

class priceController {
    async getPrice(req, res) {
        const promocode = req.params.promocode;
        const request = new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM prices WHERE promocode = $1`,
                [promocode],
                (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
                }
            );
        });
        try {
          const result = await request;
          res.status(200).json(result.rows);
        } catch (e) {
          res.status(400).send(e);
        }
      }

      async deletePrice(req, res) {
        const promocode = req.params.promocode;
        const request = new Promise((resolve, reject) => {
            db.query(
                `DELETE FROM prices WHERE promocode = $1`,
                [promocode],
                (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
                }
            );
        });
        try {
          const result = await request;
          res.status(200).json(result.rows);
        } catch (e) {
          res.status(400).send(e);
        }
      }

      async addPrice(req, res) {
        const {promocode, month1, month2, month3, month6, month12, end_date} = req.body;
        const request = new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO prices (promocode, 1month, 2month, 3month, 6month, 12month) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [promocode, month1, month2, month3, month6, month12, end_date],
                (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
                }
            );
        });
        try {
          const result = await request;
          res.status(200).json(result.rows);
        } catch (e) {
          res.status(400).send(e);
        }
      }
}

module.exports = new priceController();