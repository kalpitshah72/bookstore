const bookRepository = require("../repositories/bookRepository");

class BookService {
  async getAllBooks() {
    try {
      return await bookRepository.getAllBooks();
    } catch (error) {
      throw error;
    }
  }

  async getBookById(id) {
    try {
      return await bookRepository.getBookById(id);
    } catch (error) {
      throw error;
    }
  }

  async createBook(title, writer, coverImage, price, tag) {
    try {
      return await bookRepository.createBook(
        title,
        writer,
        coverImage,
        price,
        tag
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(id) {
    try {
      return await bookRepository.deleteBook(id);
    } catch (error) {
      throw error;
    }
  }

  // Add more methods for creating, updating, and deleting books as needed
}

module.exports = new BookService();
