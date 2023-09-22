const storeModel = require('./storeModel');

const storeService = {
  async create(payload) {
    try {
      const product = await storeModel.create(payload);
      return product;
    } catch (error) {
      throw error;
    }
  },

  async fetchSingle(productId) {
    return await storeModel.findById(productId);
  },

  async fetchAll(query) {
    return await storeModel.find(query);
  },

  async update(productId, updateData) {
    return await storeModel.findByIdAndUpdate(productId, updateData, { new: true });
  },

  async removeSingle(productId) {
    return await storeModel.findByIdAndDelete(productId);
  },

  async removeMany(productIds) {
    return await storeModel.deleteMany({ _id: { $in: productIds } });
  },
};

module.exports = storeService;
