import JobCard from "./JobCard";
import { Job } from "../../data/jobs";

type Props = {
  jobs: Job[];
};

export default function JobList({ jobs }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
