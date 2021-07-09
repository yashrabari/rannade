const express = require('express')
const router = express.Router();
const { add, cartOfUser, updateQty } = require('../../controllers/cartItem')

router.post('/add', add);
router.post('/user/:userId', cartOfUser);
router.put('/update/quantity', updateQty);

module.exports = router;