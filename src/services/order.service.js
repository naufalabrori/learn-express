const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrderPaged = async (page = 1, limit = 5, search) => {
  const skip = (page - 1) * limit;

  const Orders = await prisma.order.findMany({
    skip: skip,
    take: limit
  });

  const totalOrder = await prisma.order.count();

  return {
    data: Orders,
    currentPage: page,
    totalPages: Math.ceil(totalOrder / limit),
    totalOrder,
  };
};

const getAllOrder = async () => {
  return await prisma.order.findMany();
};

const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: {
      Id: id,
    },
  });
};

const createOrder = async (data) => {
  return await prisma.order.create({
    data: data,
  });
};

const updateOrder = async (id, data) => {
  const alreadyOrder = await getOrderById(id);

  if (!alreadyOrder) {
    return {
      message: "Order not found",
    };
  }

  return await prisma.order.update({
    where: {
      Id: id,
    },
    data: data,
  });
};

const deleteOrder = async (id) => {
  const alreadyOrder = await getOrderById(id);

  if (!alreadyOrder) {
    return {
      message: "Order not found",
    };
  }

  return await prisma.order.delete({
    where: {
      Id: id,
    },
  });
};

module.exports = {
  getOrderPaged,
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
