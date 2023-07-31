const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/bookstore", // Replace with your PostgreSQL connection details
});

class OrderRepository {
  async createOrder(customerId, bookId, price, date, status) {
    try {
      const query =
        "INSERT INTO orders (customer_id, book_id, price, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const { rows } = await pool.query(query, [
        customerId,
        bookId,
        price,
        date,
        status,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const query = "SELECT * FROM orders";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      const query = "SELECT * FROM orders WHERE id = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatusById(id, status) {
    try {
      const query = "UPDATE orders SET status = $2 WHERE id = $1 RETURNING *";
      const { rows } = await pool.query(query, [id, status]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrderRepository();
