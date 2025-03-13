require('dotenv').config();

const CONFIG = {};
CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '4003';

// CONFIG.jwtExpiration = process.env.JWT_EXPIRATION || '2 days';
// CONFIG.jwtEncryption = process.env.JWT_ENCRYPTION || 'xxx';
// CONFIG.jwtAlgorithm = process.env.JWT_ALGORITHM || 'HS256';
// CONFIG.jwtSecret = process.env.JWT_KEY_ID || 'xxxx';

CONFIG.host = process.env.MYSQL_DB_HOST || 'db-host';
CONFIG.user = process.env.MYSQL_DB_USER || 'user';
CONFIG.password = process.env.MYSQL_DB_PASS || 'password';
CONFIG.database = process.env.MYSQL_DB_NAME || 'database';
CONFIG.dialect = 'mysql';
CONFIG.pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};
CONFIG.logging = process.env.SEQULIZE_LOG || true;


module.exports = CONFIG;