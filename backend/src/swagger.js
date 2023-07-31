const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "API documentation for the Bookstore application",
    },
    servers: [
      {
        url: "http://localhost:3000", // Replace with your API server URL
        description: "Development server",
      },
    ],
  },
  apis: ["./src/controllers/*.js"], // Path to the API controllers
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
