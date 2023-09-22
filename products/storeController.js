const Store = require('./storeModel');
const storeUsecase = require('./storeUsecase');

const storeController = {
  async createproduct(req, res) {
    try {
      const { productName, price } = req.body;
      const payload = {
        productName,
        price,
      };
      const createdProduct = await storeUsecase.create(payload);

      res.status(201).json({ message: 'Product created successfully', content: createdProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await storeUsecase.fetchAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error getting products', error: error.message });
    }
  },
  async getSingleProduct(req,res){
    try {
        const {id} = req.params.id
        const singleProduct = await storeUsecase.fetchProductById(id);
        if (!singleProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json(singleProduct);
      } catch (error) {
        res.status(500).json({ content: error });
      }
    },

  async updateProduct(req, res) {
    try {
      const { productName, price, id } = req.body;

      // Find the product by id
      const product = await storeUsecase.update(id, { productName, price });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json({ message: 'Product updated successfully', content: product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id; 
      const deletedProduct = await storeUsecase.removeSingle(productId);

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(204).json(); 
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  },
};

module.exports = storeController;
