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
};
