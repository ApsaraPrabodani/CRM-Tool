// const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const dbConnection = require('../models');
const Leads = dbConnection.leads;
const Agent = dbConnection.agents;
const leadAssignments = dbConnection.leadAssignments;
const Sequelize = dbConnection.Sequelize;

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
            //console.error('Error saving leads', error);
            throw error;
        }
    }

    /**
     * Assign lead
     * @param {*} data 
     * @returns saved lead assignment
     */
    async assignLead(data){
        return await leadAssignments.create(data);
    }

    /**
     * Check is user unassigned lead
     * @param {*} leadId 
     * @returns Lead object or null
     */
    async isUnAssignedUser(leadId) {
        return await Leads.findOne({
            where: {
                id: leadId,
                status : LEAD_STATUS.UNASSIGNED
            }
        });
    }

     /**
     * Update lead status
     * @param {*} leadId 
     * @param {*} status 
     * @returns updated lead
     */
    async updateLeadStatus(leadId, status){
        return await Leads.update(
            { status: status },
            { where: { id: leadId } }
        );
    }

    /**
     * Retrive the paginated lead data
     * @param {*} filter 
     * @returns [data, meta]
     */
    async getAllLeads(filters){
        try {
            const skip = filters.per_page * (filters.page - 1);

            //filter results if any filtering applied
            let whereQuery = {};
            let assignmentJoin = {};
            let selectAttributes =  ['id', 'name', 'contact_no', 'status'];
            if (filters.status){
                whereQuery['status'] = filters.status;
            }
            // can use raw queries as follws
            // const query = `SELECT * FROM leads LIMIT ${filters.per_page} OFFSET ${skip}`
            // const leads = await sequelize.query(query , {
            //     type: QueryTypes.SELECT,
            // });
            // return leads;
            if (filters.agent_id || filters.agent) {
                assignmentJoin = {
                    model: leadAssignments,
                    required: true,
                    as: 'Assignment',
                    attributes:[]
                }

                if (filters.agent_id) {
                    assignmentJoin['where'] = {
                        agent_id: filters.agent_id
                    };
                }
    
                if (filters.agent) {
                    assignmentJoin['include'] = [
                        {
                            model: Agent,
                            required: true,
                            where: {
                                name: {
                                    [Op.like]: `%${filters.agent}%`
                                }
                            },
                            attributes:[],
                            as: 'Agent'
                        }
                    ];
                    selectAttributes.push([Sequelize.col('Assignment.Agent.name'), 'agent_name']);
                }
            }
            
            let pipeline  = {
                where: whereQuery,
                attributes: selectAttributes,
                raw: true,
                offset: skip, 
                limit: filters.per_page,
            }
            if (Object.keys(assignmentJoin).length ) {
                pipeline['include'] = [assignmentJoin];
            }

            const {count, rows} = await Leads.findAndCountAll(pipeline);
            return [rows, this.manipulateMetaObject(filters.page,  filters.per_page, skip, count)];
        } catch (error) {
            //throw erroe and controller function will handle the execption itself
            // console.error('Error fetching leads list:', error);
            throw error;
        }
    }

    manipulateMetaObject(page, per_page, skip, count) {
        return {
            current_page: page,
            last_page: Math.ceil(count / per_page),
            per_page: per_page,
            total: count,
            from: skip + 1,
            to: skip + count
        };
    }
}

module.exports = new LeadService();