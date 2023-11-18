const Transaction = require("./transaction.mongo");
const Book = require("./book.mongo");

async function AddTransaction(transaction) {
  const newtransaction = await new Transaction({
    bookId: transaction.bookId,
    borrowerId: transaction.borrowerId,
    bookName: transaction.bookName,
    borrowerName: transaction.borrowerName,
    transactionType: transaction.transactionType,
    fromDate: transaction.fromDate,
    toDate: transaction.toDate,
  });

  const nTransaction = await newtransaction.save();
  const book = Book.findById(transaction.bookId);
  await book.updateOne({ $push: { transactions: nTransaction._id } });
  return nTransaction;
}

async function GetAllTransactions() {
  const transaction = await Transaction.find({}).sort({ _id: -1 });
  return transaction;
}

async function UpdateTransaction(transactionId, transaction) {
  await Transaction.findByIdAndUpdate(transactionId, {
    $set: transaction,
  });
}

async function DeleteTransaction(transactionId) {
  const data = await Transaction.findByIdAndDelete(transactionId);
  const book = Book.findById(data.bookId);
  await book.updateOne({ $pull: { transactions: transactionId } });
}

module.exports = {
  AddTransaction,
  GetAllTransactions,
  UpdateTransaction,
  DeleteTransaction,
};
