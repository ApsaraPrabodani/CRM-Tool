const router = require('express').Router();
const leadsController = require('../../controller/leads.controller');
const leadValidator = require('../../validators/leads.validator');
const roleMiddleware = require('../../middleware/role.miidleware');
const { USER_GROUP } = require('../../constants/common.contant');

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
    roleMiddleware( // Handling role based access
        USER_GROUP.ADMIN.id
    ),
    leadValidator.validateCreateLead(),
    leadsController.createLead
)


//Get Lead List
/**
 * @swagger
 * '/api/v1/leads':
 *  get:
 *     tags:
 *     - Lead Controller
 *     summary: Get Lead list
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: page number.
 *      - in: query
 *        name: per_page
 *        schema:
 *          type: integer
 *        required: false
 *        description: per_page count.
 *      - in: query
 *        name: status
 *        schema:
 *          type: string
 *        required: false
 *        description: status of the leads shoulb be filter
 *      - in: query
 *        name: agent
 *        schema:
 *          type: string
 *        required: false
 *        description: name of the agent which assigned to leads to filter
 *      - in: query
 *        name: agent_id
 *        schema:
 *          type: integer
 *        required: false
 *        description: agent_id  which assighed to leads
 *     responses:
 *      201:
 *        description: Rerieved Data
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get(
    '/',
    leadValidator.validateGetLeadList(),
    leadsController.getAllLeads
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
    roleMiddleware( // Handling role based access
        USER_GROUP.ADMIN.id
    ),
    leadValidator.validateAssignLead(),
    leadsController.assignLead
)

module.exports = router;