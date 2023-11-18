const express = require("express");
const {
  httpAddTransaction,
  httpGetAllTransactions,
  httpUpdatetransactionById,
  httpRemoveTransactionById,
} = require("./transaction.controller");
const transactionRouter = express.Router();

transactionRouter.post("/add-transaction", httpAddTransaction);
transactionRouter.get("/all-transactions", httpGetAllTransactions);
transactionRouter.put("/update-transaction/:id", httpUpdatetransactionById);
transactionRouter.delete("/remove-transaction/:id", httpRemoveTransactionById);

module.exports = transactionRouter;
