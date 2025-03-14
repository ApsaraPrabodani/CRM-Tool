const { DataTypes } = require('sequelize');
const Agents = require('./agents.model');
const Leads = require('./leads.model');

module.exports = (sequelize, Sequelize) => {
    const LeadAssignments = sequelize.define("lead_assignments", 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lead_id: {
            type: Sequelize.INTEGER,
            references: {
                model: sequelize.model.Leads, // References Leads model
                key: 'id'
            }
        },
        agent_id: {
            type: Sequelize.INTEGER,
            references: {
                model: sequelize.model.Agents, // References Agent model
                key: 'id'
            }
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE
        }
    }, 
    { 
        timestamps  : true,
        underscored : true
    });
    return LeadAssignments;
};