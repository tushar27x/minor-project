const express = require('express');
const router = express.Router();

const Company = require('../models/company');

router.get('/:name', async (req, res) => {
    function ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    Company.findOne({name: ucfirst(req.params.name)}, (err, company) => {
        if(err){
            console.log(err)
        } else {
            res.redirect(company?.logo)
        }
    })
})

module.exports = router;