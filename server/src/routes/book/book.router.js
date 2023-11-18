const express = require("express");
const {
  httpAddBook,
  httpGetAllBooks,
  httpGetBookById,
  httpGetBookByCategoryName,
  httpUpdateBook,
  httpDeleteBook,
} = require("./book.controller");
const bookRouter = express.Router();

bookRouter.get("/allbooks", httpGetAllBooks);
bookRouter.get("/getbook/:id", httpGetBookById);
bookRouter.get("/", httpGetBookByCategoryName);
bookRouter.post("/addbook", httpAddBook);
bookRouter.put("/updatebook/:id", httpUpdateBook);
bookRouter.delete("/removebook/:id", httpDeleteBook);
module.exports = bookRouter;
