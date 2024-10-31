const express = require('express');
const router = express.Router();

const platform = require('../crawler/platform')

router.get('/:platform/:company', async (req, res) => {
    try {
        let jobs = await platform[req.params.platform](req.params.company)
        res.send(jobs)
    } catch (err) {
        console.error(err)
    }
})

module.exports = router;