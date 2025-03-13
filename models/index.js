const CONFIG = require('../config/config');
const Sequelize = require('sequelize');
const db = {};

// Create a connection to the database
const sequelize = new Sequelize(CONFIG.database, CONFIG.user, CONFIG.password, {
    host: CONFIG.host,
    dialect: CONFIG.dialect,
    pool: {
        max: CONFIG.pool.max,
        min: CONFIG.pool.min,
        acquire: CONFIG.pool.acquire,
        idle: CONFIG.pool.idle,
    },
    logging: true
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.QUERY_KEYWORDS = {
    ORDER_BY: {
        ASC: 'ASC',
        DESC: 'DESC'
    }
};

module.exports = db;