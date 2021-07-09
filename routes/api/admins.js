const express = require('express');
const router = express.Router();
const { findAll, signup, login } = require('../../controllers/admin')


router.get('/', findAll);

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;