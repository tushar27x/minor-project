const express = require('express');
const router = express.Router();

const ContentBasedRecommender = require('content-based-recommender');
const recommender = new ContentBasedRecommender({
  minScore: 0,
  maxSimilarDocuments: 100
});

// Models
//const User = require('../models/user');
const Job = require('../models/jobs');

router.get('/:jobid', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobid)
    // return res.json({ success: true, jobs: similarDocuments });
    res.render('single', {job: job})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
});

module.exports = router;
