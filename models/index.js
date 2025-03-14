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

db.leads = require('./leads.model')(sequelize, Sequelize);
db.agents = require('./agents.model')(sequelize, Sequelize);
db.leadAssignments = require('./lead-assignments.model')(sequelize, Sequelize);

db.leadAssignments.belongsTo(db.leads, {foreignKey: 'lead_id', as:'Lead'});
db.leadAssignments.belongsTo(db.agents, {foreignKey: 'agent_id', as:'Agent'});
db.leads.hasOne(db.leadAssignments, {foreignKey: 'lead_id', as: 'Assignment'});
db.agents.hasMany(db.leadAssignments, {foreignKey: 'agent_id', as: 'Lead_Assignment'});

db.QUERY_KEYWORDS = {
    ORDER_BY: {
        ASC: 'ASC',
        DESC: 'DESC'
    }
};

module.exports = db;