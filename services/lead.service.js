// const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const dbConnection = require('../models');
const Leads = dbConnection.leads;
const leadAssignments = dbConnection.leadAssignments;

const {LEAD_STATUS} = require('../constants/common.contant');

class LeadService {
    /**
     * Create lead
     * @param {*} data 
     * @returns saved lead
     */
    async createLead(data){
        try {
            return await Leads.create(data);
        } catch (error) {
            //throw erroe and controller function will handle the execption itself
            console.error('Error saving leads', error);
            throw error;
        }
    }

    async assignLead(data){
        return await leadAssignments.create(data);
    }

    async isUnAssignedUser(leadId) {
        return await Leads.findOne({
            where: {
                id: leadId,
                status : LEAD_STATUS.UNASSIGNED
            }
        });
    }

    async updateLeadStatus(leadId, status){
        return await Leads.update(
            { status: status },
            { where: { id: leadId } }
        );
    }
}

module.exports = new LeadService();