const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

module.exports = app;
