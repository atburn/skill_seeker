import { useLocation, Link } from 'react-router-dom';
import './JobDetailsPage.css';
function JobDetailsPage() {
    const { state } = useLocation();
    const { job } = state || {};

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className="job-details-page">
            <h2>{job.title}</h2>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>
            <p>Responsibilities: {job.responsibilities}</p>
            <p>Qualifications: {job.qualifications}</p>
            <Link to="/jobs">Back to Job Listings</Link>
        </div>
    );
}

export default JobDetailsPage;