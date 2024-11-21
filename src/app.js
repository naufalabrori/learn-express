const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/categories', categoryRoutes);

module.exports = app;
