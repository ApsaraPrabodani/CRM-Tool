const router = require('express').Router();
const leadsController = require('../../controller/leads.controller');
const leadValidator = require('../../validators/leads.validator');


// Create Lead
/**
 * @swagger
 * '/api/v1/leads':
 *  post:
 *     tags:
 *     - Lead Controller
 *     summary: Create Lead
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - source_type
 *              - contact_no
 *              - source
 *              - email
 *            properties:
 *              name:
 *                type: string
 *                default: Test lead
 *              source_type:
 *                type: string
 *                default: third_party
 *              contact_no:
 *                type: string
 *                default: 123456789
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
    '/',
    leadValidator.validateCreateLead(),
    leadsController.createLead
)

// Assign Lead
/**
 * @swagger
 * '/api/v1/leads/assign':
 *  post:
 *     tags:
 *     - Lead Controller
 *     summary: Assign Lead
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - lead_id
 *              - agent_id
 *            properties:
 *              lead_id:
 *                type: integer
 *                default: 1
 *              agent_id:
 *                type: integer
 *                default: 2
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

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