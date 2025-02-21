const express = require("express");
const { validate } = require("../middleware/validate.middleware");
const { transactionSchema } = require("../validations/transaction.schema");
const {
  createTransaction,
  getTransactions,
  getDashboardStats,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/", validate(transactionSchema), createTransaction);
router.get("/", getTransactions);
router.get("/dashboard", getDashboardStats);
router.put("/:id", validate(transactionSchema), updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
