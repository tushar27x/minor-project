const express = require('express');
const router = express.Router();

const standalone = require('../crawler/standalone')

router.get('/:company', async (req, res) => {
    try {
        let jobs = await standalone[req.params.company]()
        res.send(jobs)
    } catch (err) {
        console.error(err)
    }
})

module.exports = router;