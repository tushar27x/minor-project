const express = require('express');
const router = express.Router();

const standalone = require('../crawler/standalone')

router.get('/', async (req, res) => {
    res.render('home')
})

module.exports = router;