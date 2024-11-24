const orderDetailServices = require("../services/orderDetail.service");

const getOrderDetailPaged = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
  
      const orderDetails = await orderDetailServices.getOrderDetailPaged(page, limit, search);
      res.status(200).json(orderDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllOrderDetails = async (req, res) => {
    try {
      const orderDetails = await orderDetailServices.getAllOrderDetail();
      res.status(200).json(orderDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getOrderDetailById = async (req, res) => {
    try {
      const { id } = req.params;
      const orderDetail = await orderDetailServices.getOrderDetailById(id);
  
      if (!orderDetail) {
        res.status(404).json({ message: "Order Detail not found" });
      } else {
        res.status(200).json(orderDetail);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createOrderDetail = async (req, res) => {
    try {
      const data = req.body;
      const orderDetail = await orderDetailServices.createOrderDetail(data);
      res.status(200).json(orderDetail);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  const updateOrderDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      const result = await orderDetailServices.updateOrderDetail(id, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  const deleteOrderDetail = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await orderDetailServices.deleteOrderDetail(id);
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  module.exports = {
      getOrderDetailPaged,
      getAllOrderDetails,
      getOrderDetailById,
      createOrderDetail,
      updateOrderDetail,
      deleteOrderDetail
  }
  