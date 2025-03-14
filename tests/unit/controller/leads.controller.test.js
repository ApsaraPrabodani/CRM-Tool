const { validationResult } = require('express-validator');
const { errorFormatter } = require('../../../validators/error.validator');
const { locales } = require('../../../locales');
const leadService = require('../../../services/lead.service');
const { LEAD_STATUS } = require('../../../constants/common.contant');
const { createLead, assignLead, getAllLeads } = require('../../../controller/leads.controller');
// const CommonConstants = require('../../../constants/common.contant');


const {
    responseError,
    responseSuccess,
    ResponseCode
} = require('../../../services/util.service');


jest.mock('express-validator');
jest.mock('../../../validators/error.validator');
jest.mock('../../../services/util.service');
jest.mock('../../../locales');
jest.mock('../../../services/lead.service');
jest.mock('../../../constants/common.contant');

describe('Leads Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        validationResult.mockReturnValue({
            formatWith: jest.fn().mockReturnThis(),
            throw: jest.fn()
        });
        errorFormatter.mockReturnValue({});
        responseError.mockReturnValue({});
        responseSuccess.mockReturnValue({});
        locales.__ = jest.fn().mockReturnValue('mocked message');
        // LEAD_STATUS ={
        //     UNASSIGNED :'unassigned'
        // }
        // CommonConstants.LEAD_STATUS = {
        //     UNASSIGNED : 'unassigned'
        // }
    });

    // describe('createLead', () => {
    //     it('should create a lead successfully', async () => {
    //         leadService.createLead.mockResolvedValue();

    //         await createLead(req, res);

    //         expect(responseSuccess).toHaveBeenCalledWith(
    //             res,
    //             { message: 'mocked message' },
    //             ResponseCode.SUCCESS_OK
    //         );
    //     });

    //     it('should handle errors', async () => {
    //         const error = new Error('Test error');
    //         validationResult.mockImplementation(() => {
    //             throw error;
    //         });

    //         await createLead(req, res);

    //         expect(responseError).toHaveBeenCalledWith(
    //             res,
    //             error.message,
    //             ResponseCode.UNPROCESSABLE_ENTITY
    //         );
    //     });
    // });

    describe('assignLead', () => {
        // it('should assign a lead successfully', async () => {
        //     leadService.isUnAssignedUser.mockResolvedValue(null);
        //     leadService.assignLead.mockResolvedValue();
        //     leadService.updateLeadStatus.mockResolvedValue();

        //     await assignLead(req, res);

        //     expect(responseSuccess).toHaveBeenCalledWith(
        //         res,
        //         { message: 'mocked message' },
        //         ResponseCode.SUCCESS_OK
        //     );
        // });

        it('should handle errors', async () => {
            const error = new Error('Test error');
            validationResult.mockImplementation(() => {
                throw error;
            });

            await assignLead(req, res);

            expect(responseError).toHaveBeenCalledWith(
                res,
                error.message,
                ResponseCode.UNPROCESSABLE_ENTITY
            );
        });

        it('should handle already assigned lead', async () => {
            leadService.isUnAssignedUser.mockResolvedValue(true);

            await assignLead(req, res);

            expect(responseError).toHaveBeenCalledWith(
                res,
                'mocked message',
                ResponseCode.UNPROCESSABLE_ENTITY
            );
        });
    });

    describe('getAllLeads', () => {
        it('should get all leads successfully', async () => {
            const rows = [];
            const meta = {};
            leadService.getAllLeads.mockResolvedValue([rows, meta]);

            await getAllLeads(req, res);

            expect(responseSuccess).toHaveBeenCalledWith(
                res,
                { data: rows, meta },
                ResponseCode.SUCCESS_OK
            );
        });

        it('should handle errors', async () => {
            const error = new Error('Test error');
            validationResult.mockImplementation(() => {
                throw error;
            });

            await getAllLeads(req, res);

            expect(responseError).toHaveBeenCalledWith(
                res,
                error.message,
                ResponseCode.UNPROCESSABLE_ENTITY
            );
        });

        it('should handle pagination and filtering', async () => {
            const rows = [];
            const meta = {};
            req.query = { per_page: 5, page: 2 };
            leadService.getAllLeads.mockResolvedValue([rows, meta]);

            await getAllLeads(req, res);

            expect(leadService.getAllLeads).toHaveBeenCalledWith({
            per_page: 5,
            page: 2
            });
            expect(responseSuccess).toHaveBeenCalledWith(
            res,
            { data: rows, meta },
            ResponseCode.SUCCESS_OK
            );
        });
    });
});