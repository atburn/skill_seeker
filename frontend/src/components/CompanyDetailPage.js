import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CompanyDetailPage.css';

function CompanyDetailPage() {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const companyResponse = await axios.get(`http://localhost:2000/companies/${companyId}`);
                setCompany(companyResponse.data);
                const jobsResponse = await axios.get(`http://localhost:2000/companies/${companyId}/jobs`);
                setJobs(jobsResponse.data);
            } catch (error) {
                console.error('Error fetching company and jobs:', error);
            }
        };

        fetchCompanyDetails();
    }, [companyId]);

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div className="company-detail-page">
            <h1>{company.name}</h1>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>Location:</strong> {company.location}</p>
            <p><strong>Email:</strong> {company.email}</p>
            <p><strong>Description:</strong> {company.summary}</p>
            <h2>Available Jobs</h2>
            {jobs.length ? (
                <ul>
                    {jobs.map(job => (
                        <li key={job.jobid}>
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                            <Link to={`/jobs/${job.jobid}`}>View</Link>
                            {/* You can also add an Apply button here */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No current job openings.</p>
            )}
            <br></br>
            <button onClick={() => navigate(-1)}>Back to Main Companies Page</button>
        </div>
    );
}

export default CompanyDetailPage;
