import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './JobDetailsPage.css';
function JobDetailsPage() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetchJob();
    }, [jobId]);

    const fetchJob = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/jobs/${jobId}`);
            setJob(response.data);
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

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