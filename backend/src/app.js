const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { sequelize, testConnection } = require('./config/database');
const swaggerSpecs = require('./swagger');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/tasks', taskRoutes);

// Test database connection and start server
const startServer = async () => {
    try {
        await testConnection();
        await sequelize.sync();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer(); 