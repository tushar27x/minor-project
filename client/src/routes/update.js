const express = require('express');
const router = express.Router();
const Jobs = require('../models/jobs')
const platform = require('../crawler/platform')
const data = require('../crawler/data')

router.get('/', async (req, res) => {
    try {

        for(const [key, val] of Object.entries(data)){
            let jobs = await platform[val](key)
            
            for(let job of jobs){
                let found = await Jobs.find({job_id: job.job_id, company: job.company})
                
                if(found.length==0)
                    await Jobs.create(job)
            }
        }

        res.send('Database Updated')
    } catch (err) {
        console.error(err)
    }
})

module.exports = router;