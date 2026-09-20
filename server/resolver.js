import { getJobs } from './db/jobs.js';

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
        date: (job) => toIsoDate(job.createdAt)
    }
};


function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}