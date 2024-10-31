const axios = require('axios');
const { param } = require('../routes/platform');


// exports.skillate = async (company) => {
//     let jobs = await axios.get('https://'+company+'.skillate.com/api/jobs')

//     jobs = jobs.data.data.rows.map((job) => {
//         return {
//             job_id: job.id,
//             title: job.title,
//             description: job.description_external,
//             location: job.location,
//             company,
//             platform: 'skillate',
//             apply_url: `https://${company}.skillate.com/jobs/${job.id}`,
//             created_at: job.created_on,
//             updated_at: job.updated_on
//         }
//     })
    
//     return jobs;
// }



exports.lever = async (company) => {
    let jobs = await axios.get('https://api.lever.co/v0/postings/'+company+'?mode=json')

    jobs = jobs.data.map((job) => {
        return {
            job_id: job.id,
            title: job.text,
            description: job.description,
            location: job.categories.location,
            company,
            platform: 'lever',
            apply_url: job.applyUrl,
            created_at: job.createdAt,
        }
    })
    
    return jobs;
}



exports.greenhouse = async (company) => {
    let jobs = await axios.get(`https://boards-api.greenhouse.io/v1/boards/${process.env.GREENHOUE}/jobs`)
    
    jobs = jobs.data.jobs.map((job) => {

        //let description = await axios.get(`https://boards-api.greenhouse.io/v1/boards/${company}/jobs/${job.internal_job_id}`)

        return {
            job_id: job.id,
            title: job.title,
            //description: description.data.content,
            location: job.location.name,
            company,
            platform: 'greenhouse',
            apply_url: job.absolute_url ,
            updated_at: job.updated_at,
        }
    })
    
    return jobs;    
}



exports.workable = async (company) => {
    let jobs = await axios.post('https://apply.workable.com/api/v3/accounts/'+company+'/jobs')

    jobs = jobs.data.results.map((job) => {
        return {
            job_id: job.id,
            title: job.title,
            //description: job.description,
            location: job.location ? job.location.city : '',
            company,
            platform: 'workable',
            apply_url: `https://apply.workable.com/${company}/j/${job.shortcode}/apply/`,
            created_at: job.published,
        }
    })
    
    return jobs;
}



exports.mynexthire = async (company) => {
    let jobs = await axios.post('https://'+company+'.mynexthire.com/employer/careers/reqlist/get', {"source":"careers","code":"","filterByBuId":-1})
    
    jobs = jobs.data.reqDetailsBOList.map((job) => {
        return {
            job_id: job.reqId,
            title: job.reqTitle,
            description: job.jdDisplay,
            location: job.location,
            company,
            platform: 'mynexthire',
            apply_url: job.applyUrl,
            created_at: job.approvedOn,
        }
    })
    
    return jobs;
}


exports.freshteam = async (company) => {
    let jobs = await axios.get('https://'+company+'.freshteam.com/hire/widgets/jobs.json')
    
    jobs = jobs.data.jobs.map((job) => {
        return {
            job_id: job.id,
            title: job.title,
            description: job.description,
            //location: job.location, //location pending, data is available though
            company,
            platform: 'freshteam',
            apply_url: job.url,
            created_at: job.created_at,
        }
    })
    
    return jobs;
}


exports.paramai = async (company) => {    
    let response = await axios.get(`https://${company}.app.param.ai/api/career/get_job/`);
    let jobs = response.data.data.Engineering.jobs.map((job) => {
        return {
            job_id: job.id,
            title: job.title,
            description: job.description,
            location: job.locations[0] || 'N/A',
            company,
            platform: 'paramai',
            apply_url: `https://${company}.app.param.ai/jobs/${job.slug}`,
            created_at: job.created_at,
        };
    });
    
    return jobs;
};
