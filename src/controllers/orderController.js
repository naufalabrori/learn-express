const orderServices = require("../services/order.service");

const getOrderPaged = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
  
      const orders = await orderServices.getOrderPaged(page, limit, search);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllOrders = async (req, res) => {
    try {
      const orders = await orderServices.getAllOrder();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderServices.getOrderById(id);
  
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json(order);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createOrder = async (req, res) => {
    try {
      const data = req.body;
      const order = await orderServices.createOrder(data);
      res.status(200).json(order);
    } catch (error) {
        console.log(error)
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  const updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      const result = await orderServices.updateOrder(id, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await orderServices.deleteOrder(id);
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  module.exports = {
      getOrderPaged,
      getAllOrders,
      getOrderById,
      createOrder,
      updateOrder,
      deleteOrder
  }
  