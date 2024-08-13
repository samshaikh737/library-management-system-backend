const { Transfer, Book, Branch } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const getAllTransfers = async (filters = {}) => {
    const { bookId, fromBranchId, toBranchId } = filters;

    // Build query object for filtering
    const query = {};
    if (bookId) query.bookId = bookId;
    if (fromBranchId) query.fromBranchId = fromBranchId;
    if (toBranchId) query.toBranchId = toBranchId;

    return Transfer.findAll({
        where: query,
        include: [
            { model: Book, attributes: ['id', 'title'] },
            { model: Branch, as: 'fromBranch', attributes: ['id', 'name'] },
            { model: Branch, as: 'toBranch', attributes: ['id', 'name'] },
        ],
    });
};

const createTransfer = async (data) => {
    let { title, fromBranchId, toBranchId, quantity } = data;
    quantity = Number(quantity)

    // Find book in the source branch
    const fromBranchBook = await Book.findOne({ where: { title, branchId: fromBranchId } });
    if (!fromBranchBook) {
        throw new ApiError(404, 'Book not found in the source branch');
    }

    // Find or create the book in the destination branch
    let toBranchBook = await Book.findOne({ where: { title, branchId: toBranchId } });
    const getToBranch = await Branch.findByPk(toBranchId);
    if (!toBranchBook) {
        toBranchBook = await Book.create({ title, author: fromBranchBook.author, genre: fromBranchBook.genre, quantity: 0, currentBranch: getToBranch.name, branchId: toBranchId, status: 'available', isbn: fromBranchBook.isbn });
    }


    // Check if there is enough quantity in the source branch
    if (fromBranchBook.quantity < quantity) {
        throw new ApiError(400, 'Insufficient quantity in the source branch');
    }

    // Update quantities
    fromBranchBook.quantity -= quantity;
    await fromBranchBook.save();

    toBranchBook.quantity += quantity;
    await toBranchBook.save();

    // Create transfer log
    const transferLog = await Transfer.create({
        bookId: fromBranchBook.id,
        fromBranchId,
        toBranchId,
        quantity,
        transferDate: new Date()
    });

    return transferLog;
};

const updateTransfer = async (transferId, data) => {
    let { title, fromBranchId, toBranchId, quantity } = data;
    quantity = Number(quantity);

    // Find existing transfer record
    const existingTransfer = await Transfer.findByPk(transferId);
    if (!existingTransfer) {
        throw new ApiError(404, 'Transfer record not found');
    }

    // Find book in the source branch
    const fromBranchBook = await Book.findOne({ where: { title, branchId: fromBranchId } });
    if (!fromBranchBook) {
        throw new ApiError(404, 'Book not found in the source branch');
    }

    // Find or create the book in the destination branch
    let toBranchBook = await Book.findOne({ where: { title, branchId: toBranchId } });
    const getToBranch = await Branch.findByPk(toBranchId);
    if (!toBranchBook) {
        toBranchBook = await Book.create({
            title,
            author: fromBranchBook.author,
            genre: fromBranchBook.genre,
            quantity: 0,
            currentBranch: getToBranch.name,
            branchId: toBranchId,
            status: 'available',
            isbn: fromBranchBook.isbn
        });
    }

    // Check if there is enough quantity in the source branch
    if (fromBranchBook.quantity < quantity) {
        throw new ApiError(400, 'Insufficient quantity in the source branch');
    }

    // Calculate the quantity difference from the original transfer
    const quantityDifference = quantity - existingTransfer.quantity;

    // Update quantities
    fromBranchBook.quantity -= quantityDifference;
    await fromBranchBook.save();

    toBranchBook.quantity += quantityDifference;
    await toBranchBook.save();

    // Update transfer log
    existingTransfer.fromBranchId = fromBranchId;
    existingTransfer.toBranchId = toBranchId;
    existingTransfer.quantity = quantity;
    existingTransfer.transferDate = new Date(); // Or keep the old date if needed

    await existingTransfer.save();

    return existingTransfer;
};

const deleteTransfer = async (transferId) => {
    // Find the transfer record
    const transfer = await Transfer.findByPk(transferId);
    if (!transfer) {
        throw new ApiError(404, 'Transfer record not found');
    }

    // Find book in the source branch
    const fromBranchBook = await Book.findOne({ where: { id: transfer.bookId, branchId: transfer.fromBranchId } });
    if (!fromBranchBook) {
        throw new ApiError(404, 'Book not found in the source branch');
    }

    // Find book in the destination branch
    const toBranchBook = await Book.findOne({ where: { title: fromBranchBook.title, branchId: transfer.toBranchId } });
    if (!toBranchBook) {
        throw new ApiError(404, 'Book not found in the destination branch');
    }

    // Revert quantities
    fromBranchBook.quantity += transfer.quantity;
    await fromBranchBook.save();

    toBranchBook.quantity -= transfer.quantity;
    await toBranchBook.save();


    // Delete the transfer log
    await transfer.destroy();

    return { message: 'Transfer deleted and quantities reverted successfully' };
};

module.exports = {
    getAllTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer,
};
