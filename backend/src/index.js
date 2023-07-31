const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bookController = require("./controllers/bookController");
const customerController = require("./controllers/customerController");
const orderController = require("./controllers/orderController");
const { swaggerUi, specs } = require("./swagger");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// Other middleware and configurations can be added here...

// Use the bookController for routes starting with /api/books
app.use("/api/books", bookController);

// Use the customerController for routes starting with /api/customers
app.use("/api/customers", customerController);

app.use("/api/orders", orderController);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
