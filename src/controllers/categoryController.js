const categoryService = require("../services/category.service");

const getCategoryPaged = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const users = await categoryService.getCategoryPaged(page, limit, search);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategory();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const category = await categoryService.createCategory(data);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await categoryService.updateCategory(id, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoryService.deleteCategory(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
    getCategoryPaged,
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}
