const transactionService = require("../services/transaction.service");

const createTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.createTransaction(
      req.user.userId,
      req.body
    );
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const data = await transactionService.getTransactions(
      req.user.userId,
      req.query
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await transactionService.getDashboardStats(req.user.userId);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const updatedTransaction = await transactionService.updateTransaction(
      req.user.userId,
      req.params.id,
      req.body
    );
    res.json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    await transactionService.deleteTransaction(req.user.userId, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getDashboardStats,
  updateTransaction,
  deleteTransaction,
};
