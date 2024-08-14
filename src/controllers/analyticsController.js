const ApiError = require('../utils/ApiError');
const asyncHandler = require('../middleware/asyncHandler');

const { Book, User, Branch, Checkout } = require('../models');

const getAnalytics = asyncHandler(async (req, res) => {
    try {
        const totalBooks = await Book.count().catch(() => 0);
        const totalUsers = await User.count().catch(() => 0);
        const totalBranches = await Branch.count().catch(() => 0);
        const totalCheckouts = await Checkout.count().catch(() => 0);

        const analyticsData = {
            totalBooks,
            totalUsers,
            totalBranches,
            totalCheckouts
        };

        console.log(analyticsData);

        res.status(200).json(analyticsData);
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

module.exports = {
    getAnalytics
};
