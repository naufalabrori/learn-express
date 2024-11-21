const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategoryPaged = async (page = 1, limit = 5, search) => {
  const skip = (page - 1) * limit;

  const categories = await prisma.category.findMany({
    skip: skip,
    take: limit,
    where: {
      CategoryName: { contains: search, mode: "insensitive" },
    },
  });

  const totalCategory = await prisma.category.count({
    where: {
      CategoryName: { contains: search, mode: "insensitive" },
    },
  });

  return {
    data: categories,
    currentPage: page,
    totalPages: Math.ceil(totalCategory / limit),
    totalCategory
  }
};

const getAllCategory = async () => {
  return await prisma.category.findMany();
};

const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      Id: id,
    },
  });
};

const getCategoryByName = async (name) => {
  return await prisma.category.findFirst({
    where: {
      CategoryName: name,
    },
  });
};

const createCategory = async (data) => {
  const alreadyName = await getCategoryByName(data.CategoryName);

  if (alreadyName) {
    return {
      message: "Category Name already exist",
    };
  }

  return await prisma.category.create({
    data: data,
  });
};

const updateCategory = async (id, data) => {
  const alreadyCategory = await getCategoryById(id);

  if (!alreadyCategory) {
    return {
      message: "Category not found",
    };
  }

  return await prisma.category.update({
    where: {
      Id: id,
    },
    data: data,
  });
};

const deleteCategory = async (id) => {
  const alreadyCategory = await getCategoryById(id);

  if (!alreadyCategory) {
    return {
      message: "Category not found",
    };
  }

  return await prisma.category.delete({
    where: {
      Id: id,
    },
  });
};

module.exports = {
  getCategoryPaged,
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
