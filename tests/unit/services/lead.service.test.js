const LeadService = require('../../../services/lead.service');
const dbConnection = require('../../../models');
const { Op } = require('sequelize');
const { LEAD_STATUS } = require('../../../constants/common.contant');

const Leads = dbConnection.leads;
const leadAssignments = dbConnection.leadAssignments;
const Agent = dbConnection.agents;
const Sequelize = dbConnection.Sequelize;

jest.mock('../../../models', () => ({
    leads: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        findAndCountAll: jest.fn()
    },
    leadAssignments: {
        create: jest.fn()
    },
    agents: {},
    Sequelize: {
        col: jest.fn()
    }
}));

describe('LeadService', () => {
    describe('createLead', () => {
        it('should create a lead correctly', async () => {
            const data = { name: 'Test Lead' };
            const createdLead = { id: 1, ...data };

            Leads.create.mockResolvedValue(createdLead);

            const result = await LeadService.createLead(data);

            expect(Leads.create).toHaveBeenCalledWith(data);
            expect(result).toEqual(createdLead);
        });

        it('should handle errors correctly', async () => {
            const data = { name: 'Test Lead' };
            const errorMessage = 'Error creating lead';

            Leads.create.mockRejectedValue(new Error(errorMessage));

            await expect(LeadService.createLead(data)).rejects.toThrow(errorMessage);
        });
    });

    describe('assignLead', () => {
        it('should assign a lead correctly', async () => {
            const data = { leadId: 1, agentId: 1 };
            const assignedLead = { id: 1, ...data };

            leadAssignments.create.mockResolvedValue(assignedLead);

            const result = await LeadService.assignLead(data);

            expect(leadAssignments.create).toHaveBeenCalledWith(data);
            expect(result).toEqual(assignedLead);
        });
    });

    describe('isUnAssignedUser', () => {
        it('should return the lead if it is unassigned', async () => {
            const leadId = 1;
            const lead = { id: leadId, status: LEAD_STATUS.UNASSIGNED };

            Leads.findOne.mockResolvedValue(lead);

            const result = await LeadService.isUnAssignedUser(leadId);

            expect(Leads.findOne).toHaveBeenCalledWith({
                where: {
                    id: leadId,
                    status: LEAD_STATUS.UNASSIGNED
                }
            });
            expect(result).toEqual(lead);
        });

        it('should return null if the lead is not unassigned', async () => {
            const leadId = 1;

            Leads.findOne.mockResolvedValue(null);

            const result = await LeadService.isUnAssignedUser(leadId);

            expect(Leads.findOne).toHaveBeenCalledWith({
                where: {
                    id: leadId,
                    status: LEAD_STATUS.UNASSIGNED
                }
            });
            expect(result).toBeNull();
        });
    });

    describe('updateLeadStatus', () => {
        it('should update the lead status correctly', async () => {
            const leadId = 1;
            const status = 'assigned';
            const updatedLead = [1]; // Sequelize update returns an array with the number of affected rows

            Leads.update.mockResolvedValue(updatedLead);

            const result = await LeadService.updateLeadStatus(leadId, status);

            expect(Leads.update).toHaveBeenCalledWith(
                { status: status },
                { where: { id: leadId } }
            );
            expect(result).toEqual(updatedLead);
        });

        it('should handle errors correctly', async () => {
            const leadId = 1;
            const status = 'assigned';
            const errorMessage = 'Error updating lead status';

            Leads.update.mockRejectedValue(new Error(errorMessage));

            await expect(LeadService.updateLeadStatus(leadId, status)).rejects.toThrow(errorMessage);
        });

        const Leads = dbConnection.leads;
        const leadAssignments = dbConnection.leadAssignments;
        const Agent = dbConnection.agents;
        const Sequelize = dbConnection.Sequelize;

        jest.mock('../../../models', () => ({
            leads: {
                create: jest.fn(),
                findOne: jest.fn(),
                update: jest.fn(),
                findAndCountAll: jest.fn()
            },
            leadAssignments: {
                create: jest.fn()
            },
            agents: {},
            Sequelize: {
                col: jest.fn()
            }
        }));

        describe('LeadService', () => {
            describe('createLead', () => {
                it('should create a lead correctly', async () => {
                    const data = { name: 'Test Lead' };
                    const createdLead = { id: 1, ...data };

                    Leads.create.mockResolvedValue(createdLead);

                    const result = await LeadService.createLead(data);

                    expect(Leads.create).toHaveBeenCalledWith(data);
                    expect(result).toEqual(createdLead);
                });

                it('should handle errors correctly', async () => {
                    const data = { name: 'Test Lead' };
                    const errorMessage = 'Error creating lead';

                    Leads.create.mockRejectedValue(new Error(errorMessage));

                    await expect(LeadService.createLead(data)).rejects.toThrow(errorMessage);
                });
            });

            describe('assignLead', () => {
                it('should assign a lead correctly', async () => {
                    const data = { leadId: 1, agentId: 1 };
                    const assignedLead = { id: 1, ...data };

                    leadAssignments.create.mockResolvedValue(assignedLead);

                    const result = await LeadService.assignLead(data);

                    expect(leadAssignments.create).toHaveBeenCalledWith(data);
                    expect(result).toEqual(assignedLead);
                });
            });

            describe('isUnAssignedUser', () => {
                it('should return the lead if it is unassigned', async () => {
                    const leadId = 1;
                    const lead = { id: leadId, status: LEAD_STATUS.UNASSIGNED };

                    Leads.findOne.mockResolvedValue(lead);

                    const result = await LeadService.isUnAssignedUser(leadId);

                    expect(Leads.findOne).toHaveBeenCalledWith({
                        where: {
                            id: leadId,
                            status: LEAD_STATUS.UNASSIGNED
                        }
                    });
                    expect(result).toEqual(lead);
                });

                it('should return null if the lead is not unassigned', async () => {
                    const leadId = 1;

                    Leads.findOne.mockResolvedValue(null);

                    const result = await LeadService.isUnAssignedUser(leadId);

                    expect(Leads.findOne).toHaveBeenCalledWith({
                        where: {
                            id: leadId,
                            status: LEAD_STATUS.UNASSIGNED
                        }
                    });
                    expect(result).toBeNull();
                });
            });

            describe('updateLeadStatus', () => {
                it('should update the lead status correctly', async () => {
                    const leadId = 1;
                    const status = 'assigned';
                    const updatedLead = [1]; // Sequelize update returns an array with the number of affected rows

                    Leads.update.mockResolvedValue(updatedLead);

                    const result = await LeadService.updateLeadStatus(leadId, status);

                    expect(Leads.update).toHaveBeenCalledWith(
                        { status: status },
                        { where: { id: leadId } }
                    );
                    expect(result).toEqual(updatedLead);
                });

                it('should handle errors correctly', async () => {
                    const leadId = 1;
                    const status = 'assigned';
                    const errorMessage = 'Error updating lead status';

                    Leads.update.mockRejectedValue(new Error(errorMessage));

                    await expect(LeadService.updateLeadStatus(leadId, status)).rejects.toThrow(errorMessage);
                });
            });

            describe('getAllLeads', () => {
                it('should retrieve paginated lead data correctly', async () => {
                    const filters = { per_page: 10, page: 1, status: 'new' };
                    const leads = [{ id: 1, name: 'Lead 1' }];
                    const count = 1;

                    Leads.findAndCountAll.mockResolvedValue({ count, rows: leads });

                    const result = await LeadService.getAllLeads(filters);

                    expect(Leads.findAndCountAll).toHaveBeenCalledWith({
                        where: { status: filters.status },
                        attributes: ['id', 'name', 'contact_no', 'status'],
                        raw: true,
                        offset: 0,
                        limit: filters.per_page
                    });
                    expect(result).toEqual([leads, {
                        current_page: filters.page,
                        last_page: Math.ceil(count / filters.per_page),
                        per_page: filters.per_page,
                        total: count,
                        from: 1,
                        to: count
                    }]);
                });

                it('should handle errors correctly', async () => {
                    const filters = { per_page: 10, page: 1 };
                    const errorMessage = 'Error fetching leads list';

                    Leads.findAndCountAll.mockRejectedValue(new Error(errorMessage));

                    await expect(LeadService.getAllLeads(filters)).rejects.toThrow(errorMessage);
                });
            });
        });
    });

    describe('getAllLeads', () => {
        it('should retrieve paginated lead data correctly', async () => {
            const filters = { per_page: 10, page: 1, status: 'new' };
            const leads = [{ id: 1, name: 'Lead 1' }];
            const count = 1;

            Leads.findAndCountAll.mockResolvedValue({ count, rows: leads });

            const result = await LeadService.getAllLeads(filters);

            expect(Leads.findAndCountAll).toHaveBeenCalledWith({
                where: { status: filters.status },
                attributes: ['id', 'name', 'contact_no', 'status'],
                raw: true,
                offset: 0,
                limit: filters.per_page
            });
            expect(result).toEqual([leads, {
                current_page: filters.page,
                last_page: Math.ceil(count / filters.per_page),
                per_page: filters.per_page,
                total: count,
                from: 1,
                to: count
            }]);
        });

        it('should handle errors correctly', async () => {
            const filters = { per_page: 10, page: 1 };
            const errorMessage = 'Error fetching leads list';

            Leads.findAndCountAll.mockRejectedValue(new Error(errorMessage));

            await expect(LeadService.getAllLeads(filters)).rejects.toThrow(errorMessage);
        });
    });
});