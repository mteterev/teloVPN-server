const db = require('../db');

class ServerController {
  async addServer(req, res) {
    const { server, url, max_users } = req.body;

    const request = new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO servers (server, url, cnt_users, max_users) VALUES ($1, $2, 0, $3) RETURNING *`,
        [server, url, max_users],
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
  async getServers(req, res) {
    try {
      const servers = await db.query(`SELECT * FROM servers`);
      res.json(servers.rows);
    } catch (e) {
      res.json(e);
    }
  }
  async deleteServers(req, res) {
    try {
      const { server } = req.body;
      await db.query(`DELETE FROM servers WHERE server = $1`, [server]);

      res.json(`server ${server} deleted`);
    } catch (e) {
      res.json(e);
    }
  }
  async updateServer(req, res) {
    try {
      const { server, url, max_users } = req.body;
      const updServer = await db.query(
        `UPDATE servers SET max_users = COALESCE($1, max_users), url = COALESCE($3, url) WHERE server = $2 RETURNING *`,
        [max_users, server, url]
      );
      res.json(updServer.rows[0]);
    } catch (e) {
      res.json(e);
    }
  }
  async bestServer(req, res) {
    try {
      const bestServer = await db.query(
        `SELECT 
                    server,
                    max_users - cnt_users AS avalable_users 
                FROM servers
                ORDER BY avalable_users DESC
                LIMIT 1`
      );
      res.json(bestServer.rows[0]);
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = new ServerController();
