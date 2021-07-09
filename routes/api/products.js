const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const product = require('../../controllers/product')


router.post('/create', authenticate, product.create);
router.get('/', product.all);
router.get('/:categorySlug', product.category);
router.get('/:categorySlug/:productSlug', product.getOne);


module.exports = router;