const { validationResult } = require('express-validator');
const { errorFormatter } = require('../validators/error.validator');
const {
    responseError,
    responseSuccess,
    ResponseCode
} = require('../services/util.service');
const {locales} = require('../locales');

const leadService = require('../services/lead.service');
const {LEAD_STATUS} = require('../constants/common.contant');

const createLead = async (req, res) => {
    try {
        // Validates the incoming request using custom error formatter
        validationResult(req)
            .formatWith(errorFormatter)
            .throw();

        await leadService.createLead(req.body);

        // Sends success response indicating create task was successful
        return responseSuccess(
            res,
            {
                message: locales.__('message.success.lead_create')
            },
            ResponseCode.SUCCESS_OK
        );
    } catch (error) {
         // Logs the error and sends an errorxresponse to the client
         console.log(`Error:: stack: ${error.stack}`);
         return responseError(
             res,
             (error.mapped && error.mapped()) || error.message,
             ResponseCode.UNPROCESSABLE_ENTITY
         );
    }
}

const assignLead = async (req, res) => {
    try {
        // Validates the incoming request using custom error formatter
        validationResult(req)
            .formatWith(errorFormatter)
            .throw();

        const isUnassignUser = await leadService.isUnAssignedUser(req.body.lead_id);
        if (isUnassignUser !== null){
            throw new Error(locales.__('message.error.lead_already_assigned'));
        }
       
        await leadService.assignLead(req.body);

        await leadService.updateLeadStatus(req.body.lead_id, LEAD_STATUS.ASSIGNED);

        // Sends success response indicating create task was successful
        return responseSuccess(
            res,
            {
                message: locales.__('message.success.assign')
            },
            ResponseCode.SUCCESS_OK
        );
    } catch (error) {
         // Logs the error and sends an errorxresponse to the client
         console.log(`Error:: stack: ${error.stack}`);
         return responseError(
             res,
             (error.mapped && error.mapped()) || error.message,
             ResponseCode.UNPROCESSABLE_ENTITY
         );
    }
}


module.exports = {
    createLead,
    assignLead
}