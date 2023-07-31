const amqp = require("amqplib");
const orderRepository = require("../repositories/orderRepository");
const customerService = require("../services/customerService");

// Connect to RabbitMQ server
const rabbitMQUrl = "amqp://localhost";
let channel;

(async () => {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    channel = await connection.createChannel();
    await channel.assertQueue("orderQueue", { durable: true });
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
})();

class OrderService {
  async getAllOrders() {
    try {
      return await orderRepository.getAllOrders();
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      return await orderRepository.getOrderById(id);
    } catch (error) {
      throw error;
    }
  }

  async createOrder(customerId, bookId, price) {
    try {
      // Check if the customer has enough balance to buy the book
      const customer = await customerService.getCustomerById(customerId);
      if (!customer) {
        throw new Error("Customer not found");
      }
      if (customer.balance < price) {
        throw new Error("Insufficient balance");
      }

      // Update the customer's balance
      const updatedCustomer = await customerService.updateCustomerBalance(
        customerId,
        customer.balance - price
      );

      // Create the order and store it in the database
      const order = await orderRepository.createOrder(
        customerId,
        bookId,
        price,
        new Date().toISOString(),
        "SUCCESS"
      );

      // Publish the order to RabbitMQ for processing asynchronously
      channel.sendToQueue("orderQueue", Buffer.from(JSON.stringify(order)), {
        persistent: true,
      });

      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async cancelOrder(orderId) {
    try {
      // Get the order details
      const order = await orderRepository.getOrderById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      // Refund the customer's balance
      const customer = await customerService.getCustomerById(order.customer_id);
      if (!customer) {
        throw new Error("Customer not found");
      }

      const updatedOrder = await orderRepository.updateOrderStatusById(
        orderId,
        "CANCELLED"
      );

      await customerService.updateCustomerBalance(
        customer.id,
        customer.balance + order.price
      );

      return updatedOrder;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new OrderService();
