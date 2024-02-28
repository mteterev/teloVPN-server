const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');

class UserController {
  async addUser(req, res) {
    try {
      const { user_id, refer } = req.body;
      const newUser = await db.query(
        `INSERT INTO users (user_id, role, start_date, refer) VALUES ($1, 'user', NOW(), $2) RETURNING *`,
        [user_id, refer]
      );
      res.status(200).json(newUser.rows[0]);
    } catch (e) {
      res.json(e);
    }
  }
  async getUser(req, res) {
    try {
      const user_id = req.params.user_id;
      const user = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
        user_id,
      ]);
      res.json(user.rows[0]);
    } catch (e) {
      res.json(e);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await db.query(`SELECT * FROM users`);
      res.json(users.rows);
    } catch (e) {
      res.json(e);
    }
  }
  async updateUser(req, res) {
    try {
      const { user_id, role, server, expiration_time, uuid } = req.body;
      const updateUser = await db.query(
        `UPDATE users SET role = COALESCE($2, role), server = COALESCE($3, server), expiration_time = COALESCE($4, expiration_time), uuid = COALESCE($5, uuid) where user_id = $1 RETURNING *`,
        [user_id, role, server, expiration_time, uuid]
      );
      res.json(updateUser.rows[0]);
    } catch (e) {
      res.json(e);
    }
  }
  async updateUserAfterFirstPay(req, res) {
    try {
      const { user_id, expiration_time } = req.body;
      const uuid = uuidv4();
      const bestServerQuery = await db.query(
        `SELECT 
                    server, 
                    max_users - cnt_users AS avalable_users 
                FROM servers
                ORDER BY avalable_users DESC
                LIMIT 1`
      );
      const time = new Date(expiration_time);
      const subId = nanoid(16);
      const bestServer = bestServerQuery.rows[0].server;
      const updateUser = await db.query(
        `UPDATE users SET role = 'client', server = COALESCE($2, server), expiration_time = COALESCE($3, expiration_time), subId = COALESCE($5, subId) , uuid = COALESCE($4, uuid) where user_id = $1 RETURNING *`,
        [user_id, bestServer, time, uuid, subId]
      );

      res.json(updateUser.rows[0]);
    } catch (e) {
      res.json(e);
    }
  }
  async deleteUser(req, res) {
    const user_id = req.params.user_id;

    const request = new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM users WHERE user_id = $1`,
        [user_id],
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
      res.json(result.rows[0]);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getUsersNotPay(req, res) {
    const request = new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE date_trunc('day', start_date) = date_trunc('day', current_date-10)`,
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

  async getUsersEndSubscription(req, res) {
    const request = new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE date_trunc('day', expiration_time) > date_trunc('day', current_date-6) AND date_trunc('day', expiration_time) <= date_trunc('day', current_date)`,
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

  async getUserServer(req, res) {
    const user_id = req.params.user_id;
    const request = new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          u.server,
          s.url
        FROM users AS u
        JOIN servers AS s ON u.server = s.server
        WHERE u.user_id = $1`,
        [user_id],
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
      res.status(200).json(result.rows[0]);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}

module.exports = new UserController();
