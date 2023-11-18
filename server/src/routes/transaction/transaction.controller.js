const Transaction = require("../../models/transaction.model");

async function httpAddTransaction(req, res) {
  try {
    if (req.body.isAdmin === true) {
      const transaction = Transaction.AddTransaction(req.body);
      res.status(200).json(transaction);
    } else if (req.body.isAdmin === false) {
      res.status(500).json("You are not allowed to add a Transaction");
    }
  } catch (err) {
    res.status(504).json(err);
  }
}

async function httpGetAllTransactions(req, res) {
  try {
    const transactions = await Transaction.GetAllTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    return res.status(504).json(err);
  }
}

async function httpUpdatetransactionById(req, res) {
  try {
    if (req.body.isAdmin) {
      await Transaction.UpdateTransaction(req.params.id, req.body);
      res.status(200).json("Transaction details updated successfully");
    }
  } catch (err) {
    res.status(504).json(err);
  }
}

async function httpRemoveTransactionById(req, res) {
  if (req.body.isAdmin) {
    try {
      await Transaction.DeleteTransaction(req.params);
      res.status(200).json("Transaction deleted successfully");
    } catch (err) {
      return res.status(504).json(err);
    }
  } else {
    return res.status(403).json("You dont have permission a delete a book!");
  }
}

module.exports = {
  httpAddTransaction,
  httpGetAllTransactions,
  httpUpdatetransactionById,
  httpRemoveTransactionById,
};
