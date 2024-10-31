const mongoose = require('mongoose');

let JobSchema = new mongoose.Schema({
    job_id: String,
    title: String,
    description: String,
    location: String,
    company: String,
    platform: String,
    apply_url: String,
    created_at: String,
    updated_at: String
})

module.exports =  mongoose.model('Jobs', JobSchema);