const storeService = require('./storeService');

const storeUsecase = {
  async addProduct(payload) {
    try {
      const product = await storeService.create(payload);
      return product;
    } catch (error) {
      throw error; 
    }
  },

  async fetchProducts() {
    try {
      const productList = await storeService.fetchAll();
      return productList;
    } catch (error) {
      throw error; 
    }
  },

  async fetchProductById(productId) {
    try {
      const product = await storeService.fetchSingle(productId);
      return product;
    } catch (error) {
      throw error;
    }
  },

  async update(productId, updateData) {
    try {
      const updatedProduct = await storeService.update(productId, updateData);
      return updatedProduct;
    } catch (error) {
      throw error; 
    }
  },

  async removeProduct(productId) {
    try {
      return storeService.removeSingle(productId);
    } catch (error) {
      throw error;
    }
  },

  async removeMultipleProducts(productIds) {
    try {
      return storeService.removeMany(productIds);
    } catch (error) {
      throw error; 
    }
  },
};

module.exports = storeUsecase;
