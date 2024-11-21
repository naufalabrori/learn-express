const roleService = require("../services/role.service");

const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);

    return res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: "Create Role failed" });
  }
};

const getAllRole = async (req, res) => {
  try {
    const roles = await roleService.getAllRole();

    return res.status(200).json(roles);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);
    
    if (!role){
        return res.status(400).json({ message: "Data Not Found" });
    } else {
        return res.status(200).json(role);
    }

  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const role = await roleService.updateRole(id, data);

    return res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.deleteRole(id);

    return res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRolesPaged = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const roles = await roleService.getRolesPaged(page, limit, search);
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRole,
  getRoleById,
  updateRole,
  deleteRole,
  getRolesPaged
};
