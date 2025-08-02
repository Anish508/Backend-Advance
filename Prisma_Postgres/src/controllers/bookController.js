const bookService = require("../services/bookService.js")


exports.addBook = async (req, res) => {
      try {
            console.log("Received addBook request...");
            const { title, publishedDate, authorId } = req.body;
            console.log("Request body:", req.body);

            const book = await bookService.addBook(
                  title,
                  new Date(publishedDate),
                  authorId
            );

            console.log("Book added successfully:", book);

            res.status(201).json({
                  success: true,
                  data: book
            });
      } catch (error) {
            console.error("Error in addBook:", error);
            res.status(500).json({
                  success: false,
                  message: "Error while adding book"
            });
      }
};

exports.getAllBooks = async (req, res) => {
      try {
            console.log("Received getAllBook request...");
            const books = await bookService.getAllBooks()
            res.status(201).json({
                  message: "All booked fetched",
                  data: books
            })
            
      } catch (error) {
            res.status(499).json({
                  success: false,
                  message: "Error while fething all book"
            })
      }
}
exports.getBookById = async (req, res) => {
      try {
            const book = await bookService.getBookById(parseInt(req.params.id))
            if (!book) {
                  throw new Error("Book with id not found")
            }

            res.status(201).json({
                  message: "Book found",
                  data: book
            })
      } catch (error) {
            res.status(499).json({
                  success: false,
                  message: "Error while getting single book"
            })
      }
}
exports.deleteBook = async (req, res)=>{
      try {
            const deletedBook = await bookService.deleteBook(req.params.id)
            res.json({ message: `Deleted book with id ${req.params.id}`,data: deletedBook })
      } catch (error) {
            res.status(499).json({
                  success: false,
                  message: "Error while deleting book"
            })
      }
}
exports.updateBook = async (req, res) => {
      try {
            const { title } = req.body;
            const book = await bookService.updateBook(parseInt(req.params.id), title)

            res.json({ message: "updated book with id", book })
      } catch (error) {
            res.status(499).json({
                  success: false,
                  message: "Error while update Book "
            })
      }
}