const router = require('express').Router();
const leadsController = require('../../controller/leads.controller');
const leadValidator = require('../../validators/leads.validator');

router.post(
    '/',
    leadValidator.validateCreateLead(),
    leadsController.createLead
)

router.post(
    '/assign',
    leadValidator.validateAssignLead(),
    leadsController.assignLead
)

// router.patch(
//     '/:id',
//     leadsController.updateLead
// )

module.exports = router;