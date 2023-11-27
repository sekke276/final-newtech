const Book = require("../../models/book.model");

async function httpAddBook(req, res) {
    if (req.body.isAdmin) {
        try {
            const book = req.body;
            const newBook = await Book.AddNewBook(book);
            res.status(200).json(newBook);
        } catch (err) {
            res.status(404).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to create a book!");
    }
}

async function httpGetAllBooks(_, res) {
    try {
        const books = await Book.GetAllBooks();
        return res.status(200).json(books);
    } catch (err) {
        console.log(err);
        return res.status(504).json(err);
    }
}

async function httpGetBookById(req, res) {
    try {
        const book = await Book.GetBookById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function httpGetBookByCategoryName(req, res) {
    const category = req.query.category;
    try {
        const books = await Book.GetBooksByCategoryName(category);
        res.status(200).json(books);
    } catch (err) {
        return res.status(504).json(err);
    }
}

async function httpUpdateBook(req, res) {
    if (req.body.isAdmin) {
        try {
            await Book.UpdateBook(req.params.id, req.body);
            res.status(200).json("Book details updated successfully");
        } catch (err) {
            res.status(403).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
}

async function httpDeleteBook(req, res) {
    if (req.body.isAdmin) {
        try {
            await Book.RemoveBook(req.params.id);
            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book");
    }
}

async function httpGetNumberOfBooks(req, res) {
    try {
        let total = await Book.GetTotalBooks();
        res.status(200).json({ "total": total })
    } catch (err) {
        return res.status(504).json(err)
    }
}

module.exports = {
    httpAddBook,
    httpGetAllBooks,
    httpGetBookById,
    httpGetBookByCategoryName,
    httpUpdateBook,
    httpDeleteBook,
    httpGetNumberOfBooks,
};
