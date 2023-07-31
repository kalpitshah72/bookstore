const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");
const orderService = require("../services/orderService");

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       description: Customer ID and Book ID for creating the order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created the order
 *       400:
 *         description: Bad Request (e.g., invalid customer ID, insufficient balance)
 *       500:
 *         description: Internal Server Error
 */

// POST /api/orders
router.post("/", async (req, res) => {
  const { customerId, bookId } = req.body;
  try {
    // Get the customer and book information
    const book = await bookService.getBookById(bookId);

    // Create the order and store it in the database
    const order = await orderService.createOrder(
      customerId,
      bookId,
      book.price
    );
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/orders/cancel:
 *   post:
 *     summary: Cancel an order and refund customer's balance
 *     tags:
 *       - Orders
 *     requestBody:
 *       description: Order ID for canceling the order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order canceled successfully, customer's balance refunded
 *       400:
 *         description: Bad Request (e.g., invalid order ID)
 *       500:
 *         description: Internal Server Error
 */

// POST /api/orders/cancel
router.post("/cancel", async (req, res) => {
  const { orderId } = req.body;
  try {
    // Cancel the order
    const canceledOrder = await orderService.cancelOrder(orderId);
    res.json(canceledOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/orders
router.get("/", async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
