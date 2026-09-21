import { getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';
export const resolvers = {
    Query: {
        greeting: () => 'Hello world' ,
        jobs: async () => {
            const jobs = await getJobs();
            //console.log(jobs);
            return jobs;
        } // this is the same as () => getJobs()
    },
    Job : {
        date: (job) => toIsoDate(job.createdAt),
        company: async (job) =>  getCompany(job.companyId)
    }
};


function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}