const productServices = require("../services/product.service");

const getProductPaged = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
  
      const products = await productServices.getProductPaged(page, limit, search);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllProducts = async (req, res) => {
    try {
      const products = await productServices.getAllProduct();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const Product = await productServices.getProductById(id);
  
      if (!Product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(Product);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createProduct = async (req, res) => {
    try {
      const data = req.body;
      const Product = await productServices.createProduct(data);
      res.status(200).json(Product);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      const result = await productServices.updateProduct(id, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await productServices.deleteProduct(id);
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  module.exports = {
      getProductPaged,
      getAllProducts,
      getProductById,
      createProduct,
      updateProduct,
      deleteProduct
  }
  