const mongoose = require('mongoose');

let CompanySchema = new mongoose.Schema({
    name: String,
    logo: String
})

module.exports =  mongoose.model('Companies', CompanySchema);