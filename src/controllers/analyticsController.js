const ApiError = require('../utils/ApiError');
const { Book, User, Branch, Checkout } = require('../models');


const getAnalytics = async (req, res) => {
    try {
        const totalBooks = await Book.count();
        const totalUsers = await User.count();
        const totalBranches = await Branch.count();
        const totalCheckouts = await Checkout.count();

        const analyticsData = {
            totalBooks,
            totalUsers,
            totalBranches,
            totalCheckouts
        };

        res.status(200).json(analyticsData);
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

module.exports = {
    getAnalytics
};
