const express = require('express');
const router = express.Router();
const { getAllCategories, createCategories } = require('../../controllers/categories')

router.get('/', getAllCategories);
router.post('/', createCategories);

module.exports = router;