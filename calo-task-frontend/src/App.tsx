import './App.css'
import { JobCard } from './components/JobCard'
import { useGetJobs } from './hooks/useJobs'

function App() {
  const {
    isLoading: isJobsLoading,
    isSuccess: isJobsSuccess,
    data: jobsData
  } = useGetJobs()

  console.log(isJobsLoading, isJobsSuccess, jobsData)

  if (isJobsLoading) {
    return <div>Loading...</div>
  }

  if (!isJobsSuccess || !jobsData) {
    return <div>Error loading jobs</div>
  }

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {jobsData.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default App
