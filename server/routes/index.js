const express = require('express');
const router = express.Router();

const ContentBasedRecommender = require('content-based-recommender');
const recommender = new ContentBasedRecommender({
  minScore: 0,
  maxSimilarDocuments: 100
});

// Models
const User = require('../models/user');
const Job = require('../models/job');

router.post('/summary', async (req, res) => {
  try {
    const jobs = await Job.find().select('title company processed_description');

    const documents = jobs.map((item, index) => {
      const { processed_description } = item;

      return {
        id: item._id,
        content: processed_description?.toLowerCase()
      };
    });

    const randId = Math.floor(Math.random() * 10);

    const userSummary = {
      id: randId,
      content: req.body.summary?.toLowerCase()
    };

    documents.push(userSummary);

    // start training
    recommender.train(documents);

    //get similar items
    let similarDocuments = recommender.getSimilarDocuments(randId);

    jobs.forEach(job => {
      job.processed_description = job.processed_description?.substring(0, 100);
    })

    similarDocuments = similarDocuments.map((item) => {
      return {
        id: item.id,
        score: item.score,
        details: jobs.find((job) => job._id === item.id)
      };
    });

    return res.json({ success: true, jobs: similarDocuments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
});

module.exports = router;
