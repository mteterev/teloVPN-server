const db = require('../db')

class UserController {
    async addUser(req, res) {
        try{
            const {user_id, chat_id, role} = req.body
            const newUser = await db.query(
                `INSERT INTO users (user_id, chat_id, role, start_date) VALUES ($1, $2, $3, NOW()) RETURNING *`, 
                [user_id, chat_id, role]
            )
            res.json(newUser.rows[0])
        } catch(e) {
            res.json(e)
        }
    }
    async getUser(req, res) {
        try{
            const user_id = req.params.user_id
            const user = await db.query(
                `SELECT * FROM users WHERE user_id = $1`,
                [user_id]
            )
            res.json(user.rows[0])
        } catch(e) {
            res.json(e)
        }
    }
    async getUsers(req, res) {
        try{
            const users = await db.query(`SELECT * FROM users`)
            res.json(users.rows)
        } catch(e) {
            res.json(e)
        }
    }
    async updateUser(req, res) {
        try{
            const {user_id, role, server, expiration_time, uuid } = req.body
            console.log("update")
            const updateUser = await db.query(
                `UPDATE users SET role = $2, server = $3, expiration_time = $4, uuid = $5 where user_id = $1 RETURNING *`,
                [user_id, role, server, expiration_time, uuid]
            )

            res.json(updateUser.rows[0])
        } catch(e) {
            res.json(e)
        }
    }
    async deleteUser(req, res) {
        try{
            const user_id = req.params.user_id
            await db.query(
                `DELETE FROM users WHERE user_id = $1`,
                [user_id]
            )
            res.json(`user ${user_id} deleted`)
        } catch(e) {
            res.json(e)
        }
    }
}

module.exports = new UserController()