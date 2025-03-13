const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'CRM API',
        version: '1.0.0',
        description: 'CRM API Descriptions'
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/v1/*.routes.js'], // Path to the files containing your JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;