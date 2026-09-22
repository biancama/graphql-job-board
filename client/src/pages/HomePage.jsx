import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
// import { jobs } from '../lib/fake-data';
import { getJob } from '../lib/graphql/queries';
function HomePage() {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    async function fethData() {
      const fetchJob = await getJob();
      setJobs(fetchJob);
    }
    fethData();
    
  }, [] );
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
