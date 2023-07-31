const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/bookstore", // Replace with your PostgreSQL connection details
});

class BookRepository {
  async getAllBooks() {
    try {
      const query = "SELECT * FROM books";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getBookById(id) {
    try {
      const query = "SELECT * FROM books WHERE id = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async createBook(title, writer, coverImage, price, tag) {
    try {
      const query =
        "INSERT INTO books (title, writer, coverimage, price, tag) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const { rows } = await pool.query(query, [
        title,
        writer,
        coverImage,
        price,
        tag,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(id) {
    try {
      const query = "DELETE FROM books WHERE id = $1 RETURNING *";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Add more methods for creating, updating, and deleting books as needed
}

module.exports = new BookRepository();
