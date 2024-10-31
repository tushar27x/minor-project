const express = require('express');
const router = express.Router();

const sw = require('stopword');
const rw = require('remove-words');
const strip_tags = require('striptags');
const recommend = require('collaborative-filter');

router.get('/recommendation', async (req, res) => {
  try {
    let jobs = await Job.find().select('description').limit(10);

    jobs.forEach(async (job) => {
      console.log(job.description);
      job.processed_description = strip_tags(job.description);
      job.processed_description = sw.removeStopwords(job.processed_description.split(' ')).join(' ');
      job.processed_description = rw(job.processed_description).join(' ');
      await job.save();
    });

    return res.json({ success: true, jobs });
    // const ratings = [
    //   [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
    //   [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    //   [1, 0, 1, 0, 1, 0, 0, 1, 0, 1]
    // ];

    // const coMatrix = recommend.coMatrix(ratings, 4, 10);
    // const result = recommend.getRecommendations(ratings, coMatrix, 0);

    // return res.json(result);
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
});

const Job = require('../models/job');

router.get('/', async (req, res) => {
  try {
    let jobs = await Job.find().select('description').skip(0);

    jobs.forEach(async (job) => {
      console.log(job.description);
      job.processed_description = strip_tags(job.description);
      job.processed_description = sw
        .removeStopwords(job.processed_description.split(' '))
        .join(' ');
      job.processed_description = rw(job.processed_description).join(' ');
      await job.save();
    });

    return res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
});

module.exports = router;
