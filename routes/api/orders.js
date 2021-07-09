const express = require('express');
const router = express.Router();
const order = require('../../controllers/order')

router.post('/create', order.create)
router.get('/getorders/:userId', order.userOrder);

module.exports = router;