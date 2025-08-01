// routes/authorRoutes.js
const express = require('express');
const { addAuthor } = require('../controllers/authorController');

const router = express.Router();

router.post('/add-author', addAuthor);

module.exports = router;
