const express = require('express');
const leadsRoute = require('./v1/leads.routes');
const { user }  = require('../middleware/auth.middleware')

// back in our API router
const router = express.Router();

router.use('/leads', user, leadsRoute);


module.exports = router;