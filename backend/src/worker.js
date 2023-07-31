const amqp = require("amqplib");

const rabbitMQUrl = "amqp://localhost"; // Replace with your RabbitMQ server URL

(async () => {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue("orderQueue", { durable: true });

    channel.consume("orderQueue", async (message) => {
      const orderData = JSON.parse(message.content.toString());

      // Process the order (e.g., send a confirmation email, update order status, etc.)
      await processOrder(orderData);

      // Acknowledge the message to remove it from the queue
      channel.ack(message);
    });
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
})();

async function processOrder(orderData) {
  try {
    // Simulate processing time (e.g., sending an email or performing other tasks)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Update the order status or perform other actions as needed
    // For simplicity, we'll just log the processed order data
    console.log("Processed Order:", orderData);
  } catch (error) {
    console.error("Error processing order:", error);
  }
}
