const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getReviewPaged = async (page = 1, limit = 5, search) => {
  const skip = (page - 1) * limit;

  const reviews = await prisma.review.findMany({
    skip: skip,
    take: limit
  });

  const totalReview = await prisma.review.count();

  return {
    data: reviews,
    currentPage: page,
    totalPages: Math.ceil(totalReview / limit),
    totalReview,
  };
};

const getAllReview = async () => {
  return await prisma.review.findMany();
};

const getReviewById = async (id) => {
  return await prisma.review.findUnique({
    where: {
      Id: id,
    },
  });
};

const createReview = async (data) => {
  return await prisma.review.create({
    data: data,
  });
};

const updateReview = async (id, data) => {
  const alreadyReview = await getReviewById(id);

  if (!alreadyReview) {
    return {
      message: "Review not found",
    };
  }

  return await prisma.review.update({
    where: {
      Id: id,
    },
    data: data,
  });
};

const deleteReview = async (id) => {
  const alreadyReview = await getReviewById(id);

  if (!alreadyReview) {
    return {
      message: "Review not found",
    };
  }

  return await prisma.review.delete({
    where: {
      Id: id,
    },
  });
};

module.exports = {
  getReviewPaged,
  getAllReview,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
