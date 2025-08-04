// routes/authorRoutes.js
const express = require('express');
const { addAuthor,deleteAuthor } = require('../controllers/authorController.js');

const router = express.Router();

router.post('/add-author', addAuthor);
router.post('/delete-author/:id', deleteAuthor);

module.exports = router;
