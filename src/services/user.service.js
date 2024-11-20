const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const getUserPaged = async (page = 1, limit = 5, search) => {
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip: skip,
    take: limit,
    where: {
      OR: [
        { Username: { contains: search, mode:"insensitive" }},
        { Email: { contains: search, mode:"insensitive" }},
        { PhoneNumber: { contains: search, mode:"insensitive" }},
      ]
    },
    orderBy: { CreatedAt: "desc"}
  });

  const totalUsers = await prisma.user.count({
    where: {
      OR: [
        { Username: { contains: search, mode:"insensitive" }},
        { Email: { contains: search, mode:"insensitive" }},
      ]
    },
  })

  return {
    data: users,
    currentPage: page,
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers
  }
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
}

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      Id: id,
    },
    select: {
      Id: true,
      Username: true,
      Email: true,
      PhoneNumber: true,
      RoleId: true,
      CreatedAt: true,
      UpdatedAt: true
    }
  });
};

const createUser = async (data) => {
  return await prisma.user.create({ data });
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: {
      Id: id,
    },
    data: data,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      Id: id,
    },
  });
};

const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      Username: username
    }
  });
};

module.exports = {
  getUserPaged,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUsername,
};
