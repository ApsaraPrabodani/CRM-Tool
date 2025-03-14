const express = require('express');
const leadsRoute = require('./v1/leads.routes');

// back in our API router
const router = express.Router();

router.use('/leads', leadsRoute);


module.exports = router;