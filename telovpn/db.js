const Pool = require('pg').Pool
const pool = new Pool({
    user: "telovpn",
    password: 'password1235',
    database: 'telovpn',
    host: "postgres",
    port: 5432
});


module.exports = pool