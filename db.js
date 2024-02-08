const Pool = require('pg').Pool
const pool = new Pool({
    user: "telovpn",
    password: 'password1235',
    database: 'telovpn',
    host: "0.0.0.0",
    port: 5432
});


module.exports = pool