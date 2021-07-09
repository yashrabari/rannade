const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');


const user = require('../../controllers/user')

router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/new-address', authenticate, user.newAddress);
router.get('/get-addresses/:userId', authenticate, user.getAddress);

module.exports = router;