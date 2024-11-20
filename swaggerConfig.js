const swaggerJSDoc = require('swagger-jsdoc');

// Konfigurasi Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Versi OpenAPI
        info: {
            title: 'API Documentation', // Judul API Anda
            version: '1.0.0', // Versi API
            description: 'Dokumentasi API menggunakan Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL server Anda
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Lokasi file rute atau anotasi API
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
