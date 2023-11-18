const express = require("express");

const authRouter = require("./auth/auth.router");
const categoryRouter = require("./category/category.router");
const userRouter = require("./user/user.router");
const bookRouter = require("./book/book.router");
const transactionRouter = require("./transaction/transaction.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/users", userRouter);
api.use("/books", bookRouter);
api.use("/transactions", transactionRouter);
api.use("/categories", categoryRouter);

module.exports = api;
