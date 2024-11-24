const reviewServices = require("../services/review.service");

const getReviewPaged = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const reviews = await reviewServices.getReviewPaged(page, limit, search);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewServices.getAllReview();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewServices.getReviewById(id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const data = req.body;
    const review = await reviewServices.createReview(data);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await reviewServices.updateReview(id, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await reviewServices.deleteReview(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getReviewPaged,
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
