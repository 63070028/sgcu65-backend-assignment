import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotnev from "dotenv";
import { Express } from 'express';

dotnev.config();

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Task API',
        version: '1.0.0',
        description: 'API documentation for the user-service',
    },
    servers: [
        {
            url: 'http://localhost:'+process.env.PORT, // change to your server's URL
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./src/user/UserRouter.ts'], // Path to your API files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options); 

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at http://localhost:${process.env.PORT}/api-docs`);
};
