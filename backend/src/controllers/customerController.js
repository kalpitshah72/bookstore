const express = require("express");
const router = express.Router();
const customerService = require("../services/customerService");

// POST /api/customers
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const customer = await customerService.createCustomer(name);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/customers/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await customerService.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add more route handlers for updating and deleting customers as needed

module.exports = router;
