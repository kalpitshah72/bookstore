const customerRepository = require("../repositories/customerRepository");

class CustomerService {
  async createCustomer(name) {
    try {
      // Ensure the customer's balance is set to 100 when created
      const initialBalance = 100;
      const customer = await customerRepository.createCustomer(
        name,
        initialBalance
      );
      return customer;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerById(id) {
    try {
      return await customerRepository.getCustomerById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateCustomerBalance(customerId, newBalance) {
    try {
      const customer = await customerRepository.getCustomerById(customerId);
      if (!customer) {
        throw new Error("Customer not found");
      }

      // Update the customer's balance in the database
      const updatedCustomer = await customerRepository.updateCustomerBalance(
        customerId,
        newBalance
      );

      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }

  // Add more methods for updating and querying customers as needed
}

module.exports = new CustomerService();
