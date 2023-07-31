const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/bookstore", // Replace with your PostgreSQL connection details
});

class CustomerRepository {
  async createCustomer(name, balance) {
    try {
      const query =
        "INSERT INTO customers (name, balance) VALUES ($1, $2) RETURNING *";
      const { rows } = await pool.query(query, [name, balance]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getCustomerById(id) {
    try {
      const query = "SELECT * FROM customers WHERE id = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateCustomerBalance(customerId, newBalance) {
    try {
      const query =
        "UPDATE customers SET balance = $2 WHERE id = $1 RETURNING *";
      const { rows } = await pool.query(query, [customerId, newBalance]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Add more methods for updating and querying customers as needed
}

module.exports = new CustomerRepository();
