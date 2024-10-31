const axios = require('axios')

// exports.urbancompany = async () => {
//     let jobs = await axios.post('https://www.urbanclap.com/api/v2/org-operations/getAlljobs')
//     console.log(jobs);
//     jobs = jobs.data.jobs.map((job) => {
//         return {
//             job_id: job.job_id,
//             title: job.job_title,
//             description: job.jdDisplay,
//             location: job.location[0],
//             company: 'urbancompany',
//             platform: 'standalone',
//             apply_url: `https://careers.urbancompany.com/jobDetail?id=${job.job_id}`,
//             created_at: job.job_created_timestamp,
//             update_at: job.job_updated_timestamp,
//         }
//     })
    
//     return jobs;
// }

exports.tata1mg = async () => {
    let jobs = await axios.get('https://www.1mg.com/pharmacy_api/get-all-jobs')
    return jobs.data;
}

exports.unacademy = async () => {
    let jobs = await axios.get('https://0qv3y4glfd.execute-api.us-east-1.amazonaws.com/gamma/spi/v3/jobs?limit=100&state=published&include_fields=employment_type')
    
    jobs = jobs.data.jobs.map((job) => {
        return {
            job_id: job.id,
            title: job.full_title,
            //description: job.jdDisplay,
            location: job.location.location_str,
            company: 'unacademy',
            platform: 'standalone',
            apply_url: job.application_url,
            created_at: job.created_at,
        }
    })
    
    return jobs;
}

