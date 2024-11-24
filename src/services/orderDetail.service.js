const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrderDetailPaged = async (page = 1, limit = 5, search) => {
  const skip = (page - 1) * limit;

  const orderDetails = await prisma.orderDetail.findMany({
    skip: skip,
    take: limit,
  });

  const totalOrderDetail = await prisma.orderDetail.count();

  return {
    data: orderDetails,
    currentPage: page,
    totalPages: Math.ceil(totalOrderDetail / limit),
    totalOrderDetail,
  };
};

const getAllOrderDetail = async () => {
  return await prisma.orderDetail.findMany();
};

const getOrderDetailById = async (id) => {
  return await prisma.orderDetail.findUnique({
    where: {
      Id: id,
    },
  });
};

const createOrderDetail = async (data) => {
  return await prisma.orderDetail.create({
    data: data,
  });
};

const updateOrderDetail = async (id, data) => {
  const alreadyOrderDetail = await getOrderDetailById(id);

  if (!alreadyOrderDetail) {
    return {
      message: "Order Detail not found",
    };
  }

  return await prisma.orderDetail.update({
    where: {
      Id: id,
    },
    data: data,
  });
};

const deleteOrderDetail = async (id) => {
  const alreadyOrderDetail = await getOrderDetailById(id);

  if (!alreadyOrderDetail) {
    return {
      message: "OrderDetail not found",
    };
  }

  return await prisma.orderDetail.delete({
    where: {
      Id: id,
    },
  });
};

module.exports = {
  getOrderDetailPaged,
  getAllOrderDetail,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
