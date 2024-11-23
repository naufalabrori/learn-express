const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProductPaged = async (page = 1, limit = 5, search) => {
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    skip: skip,
    take: limit,
    where: {
      ProductName: { contains: search, mode: "insensitive" },
      Description: { contains: search, mode: "insensitive" }
    },
  });

  const totalProduct = await prisma.product.count({
    where: {
      ProductName: { contains: search, mode: "insensitive" },
      Description: { contains: search, mode: "insensitive" }
    },
  });

  return {
    data: products,
    currentPage: page,
    totalPages: Math.ceil(totalProduct / limit),
    totalProduct,
  };
};

const getAllProduct = async () => {
  return await prisma.product.findMany();
};

const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      Id: id,
    },
  });
};

const createProduct = async (data) => {
  return await prisma.product.create({
    data: data,
  });
};

const updateProduct = async (id, data) => {
  const alreadyProduct = await getProductById(id);

  if (!alreadyProduct) {
    return {
      message: "Product not found",
    };
  }

  return await prisma.product.update({
    where: {
      Id: id,
    },
    data: data,
  });
};

const deleteProduct = async (id) => {
  const alreadyProduct = await getProductById(id);

  if (!alreadyProduct) {
    return {
      message: "Product not found",
    };
  }

  return await prisma.product.delete({
    where: {
      Id: id,
    },
  });
};

module.exports = {
  getProductPaged,
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
