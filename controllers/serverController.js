const db = require('../db')

class UserController {
    async addServer(req, res) {
        try{
            const {server, cnt_users, max_users} = req.body
            const newServer = await db.query(
                `INSERT INTO servers (server, cnt_users, max_users) VALUES ($1, $2, $3) RETURNING *`, 
                [server, cnt_users, max_users]
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
            const delServer = await db.query(
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
            const {server, cnt_users, max_users} = req.body
            const updServer = await db.query(
                `UPDATE servers SET cnt_users = $1, max_users = $2 WHERE server = $3 RETURNING *`,
                [cnt_users, max_users, server])
            res.json(updServer.rows[0])
        } catch(e) {
            res.json(e)
        }
    }
}

module.exports = new UserController()