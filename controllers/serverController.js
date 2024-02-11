const db = require('../db')

class UserController {
    async addServer(req, res) {
        try{
            const {server, max_users} = req.body
            const newServer = await db.query(
                `INSERT INTO servers (server, cnt_users, max_users) VALUES ($1, 0, $2) RETURNING *`, 
                [server, max_users]
            )
            res.json(newServer.rows[0])
        } catch(e) {
            res.json(e)
        }
    }
    async getServers(req, res) {
        try{
            const servers = await db.query(`SELECT * FROM servers`)
            res.json(servers.rows)
        } catch(e) {
            res.json(e)
        }
    }
    async deleteServers(req, res) {
        try{
            const {server} = req.body
            await db.query(
                `DELETE FROM servers WHERE server = $1`,
                [server]
            )
            
            res.json(`server ${server} deleted`)
        } catch(e) {
            res.json(e)
        }
    }
    async updateServer(req, res){
        try{
            const {server, max_users} = req.body
            const updServer = await db.query(
                `UPDATE servers SET max_users = $1 WHERE server = $2 RETURNING *`,
                [max_users, server])
            res.json(updServer.rows[0])
        } catch(e) {
            res.json(e)
        }
    }
    async bestServer(req, res){
        try{
            const bestServer = await db.query(
                `SELECT 
                    server, 
                    max_users - cnt_users AS avalable_users 
                FROM servers
                ORDER BY avalable_users DESC
                LIMIT 1`
            )
            res.json(bestServer.rows[0])
        } catch(e) {
            res.json(e)
        }
    }
}

module.exports = new UserController()