const express = require("express");
const {
    httpAddBook,
    httpGetAllBooks,
    httpGetBookById,
    httpGetBookByCategoryName,
    httpUpdateBook,
    httpDeleteBook,
    httpGetNumberOfBooks,
} = require("./book.controller");
const bookRouter = express.Router();

bookRouter.get("/allbooks", httpGetAllBooks);
bookRouter.get("/totalbooks", httpGetNumberOfBooks);
bookRouter.get("/getbook/:id", httpGetBookById);
bookRouter.post("/addbook", httpAddBook);
bookRouter.get("/", httpGetBookByCategoryName);
bookRouter.put("/updatebook/:id", httpUpdateBook);
bookRouter.delete("/removebook/:id", httpDeleteBook);
module.exports = bookRouter;
