// routes/authorRoutes.js
const express = require('express');
const {addBook, deleteBook,getAllBooks,updateBook,getBookById} = require('../controllers/bookController.js');

const router = express.Router();

router.post('/add-book', addBook)
router.get('/get-single-book/:id', getBookById)
router.post('/delete-book/:id', deleteBook)
router.post('/update-book/:id', updateBook)
router.get('/get-all-books', getAllBooks)

module.exports = router