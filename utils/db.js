const mysql = require('mysql2/promise');
// permet d'utiliser async await
const config = require('../config');

const db = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUsername,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

module.exports = db;