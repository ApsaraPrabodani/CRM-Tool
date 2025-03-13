
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


const CONFIG = require('./config/config');
const routes = require('./routes/routes');

//// DATABASE /////
const db = require("./models");
db.sequelize.sync();

// Create global app object
var app = express();
app.use(helmet());

// frontend accepted headers
const corsOptions = {
    origin: CONFIG.origin,
    exposedHeaders:
    'Authorization'
};

// CORS
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/v1', routes);

app.use('/', function(req, res) {
    // send the appropriate status code
    res.statusCode = 200;
    res.json({
        status: 'success',
        message: 'Welcome to CRM API',
        data: {}
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

process.on('unhandledRejection', error => {
    //console.log('Uncaught Error', parseError(error));
    console.log('Uncaught Error', (error));
});
