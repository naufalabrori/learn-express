const userService = require("../services/user.service");
const { generateToken } = require("../utils/generateJWTToken");
const bcrypt = require("bcryptjs");

const getUserPaged = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const users = await userService.getUserPaged(page, limit, search);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: "Users not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const data = req.body;
    data.Password = await bcrypt.hash(data.Password, 10);

    const user = await userService.createUser(data);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await userService.updateUser(id, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userService.deleteUser(id);

    if (!result) {
      res.status(404).json({ message: "Users not found" });
    } else {
      res.status(200).json({ message: "Users delete successfully" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const user = await userService.getUserByUsername(Username);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = generateToken(user);

    res.status(200).json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getUserPaged,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
