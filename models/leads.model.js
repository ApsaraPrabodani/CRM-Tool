const { DataTypes } = require('sequelize');
const CommonConstants = require('../constants/common.contant');

module.exports = (sequelize, Sequelize) => {
    const Leads = sequelize.define("leads", 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        source_type: {
            type: DataTypes.ENUM('third_party', 'marketing_campaign', 'landing_pages')
        },
        source: {
            type: Sequelize.STRING
        },
        status: {
            type: DataTypes.ENUM('unassigned', 'assigned', 'reserved', 'financial approved', 'legal finalized', 'sold'),
            default: CommonConstants.LEAD_STATUS.UNASSIGNED
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
    return Leads;
};