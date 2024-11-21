const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createRole = async (data) => {
  return await prisma.role.create({ data });
};

const getAllRole = async () => {
  const roles = await prisma.role.findMany();

  return roles;
};

const getRoleById = async (id) => {
  const role = await prisma.role.findUnique({
    where: {
      Id: id,
    },
  });

  return role;
};

const getRolesPaged = async (page = 1, limit = 5, search) => {
  const skip = (page - 1) * limit;

  const roles = await prisma.role.findMany({
    skip: skip,
    take: limit,
    where: {
      RoleName: { contains: search, mode: "insensitive" }
    },
    select: {
      Id: true,
      RoleName: true,
      CreatedAt: true,
      UpdatedAt: true
    },
    orderBy: {
      CreatedAt: "desc"
    }
  })

  const totalRoles = await prisma.role.count({
    where: {
      RoleName: { contains: search, mode: "insensitive" }
    }
  })

  return {
    data: roles,
    currentPage: page,
    totalPages: Math.ceil(totalRoles / limit),
    totalRoles
  }
}

const updateRole = async (id, data) => {
  const updatedRole = await prisma.role.update({
    where: {
      Id: id,
    },
    data: data,
  });

  return updatedRole;
};

const deleteRole = async (id) => {
  return await prisma.role.delete({
    where: {
      Id: id,
    },
  });
};

module.exports = {
  createRole,
  getAllRole,
  getRoleById,
  updateRole,
  deleteRole,
  getRolesPaged
};
