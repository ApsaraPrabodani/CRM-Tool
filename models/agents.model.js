const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Agents = sequelize.define("agents", 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        contact_no: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
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
    return Agents;
};