const Book = require("./book.mongo");
const Category = require("./category.mongo");

async function AddNewBook(book) {
    const newBook = await new Book({
        bookName: book.bookName,
        alternateTitle: book.alternateTitle,
        author: book.author,
        bookCountAvailable: book.bookCountAvailable,
        language: book.language,
        publisher: book.publisher,
        bookStatus: book.bookSatus,
        // categories: book.categories,
        categoryName: book.categoryName,
        image: book.image,
    });

    const nBook = await newBook.save();
    await Category.updateMany(
        { _id: nBook.categories },
        {
            $push: {
                books: nBook._id,
            },
        },
    );
    return nBook;
}

async function GetAllBooks() {
    const books = await Book.find({}).populate("transactions").sort({ _id: -1 });
    return books;
}

async function GetBookById(bookId) {
    const book = await Book.findById(bookId).populate("transactions");
    return book;
}

async function GetBooksByCategoryName(categoryName) {
    const books = await Category.findOne({ categoryName: categoryName }).populate(
        "books",
    );
    return books;
}

async function UpdateBook(bookId, book) {
    const updatedbook = await Book.findByIdAndUpdate(bookId, {
        $set: book,
    });
    return updatedbook;
}

async function RemoveBook(bookId) {
    const book = await Book.findOne({ _id: bookId });
    await book.remove();
    await Category.updateMany(
        { _id: book.categories },
        { $pull: { books: book._id } },
    );
}

async function GetTotalBooks() {
    const total = await Book.countDocuments();
    return total
}

module.exports = {
    AddNewBook,
    GetAllBooks,
    GetBookById,
    GetBooksByCategoryName,
    UpdateBook,
    RemoveBook,
    GetTotalBooks,
};
