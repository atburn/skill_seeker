import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './JobList.css';

const JobList = () => {
    const { companyId } = useParams();  
    const [jobs, setJobs] = useState([]);

    console.log(companyId); 

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                
                const response = await axios.get(`http://localhost:2000/companies/${companyId}`);
                setJobs(response.data);
            } catch (error) {
                console.error(`Error fetching jobs for company ${companyId}:`, error);
            }
        };
        if (companyId) {
        fetchJobs();
        }
    }, [companyId]); 

    return (
        <div className="job-list-container">
            <h3>Open Positions:</h3>
            {jobs.length > 0 ? (
                <ul>
                    {jobs.map(job => (
                        <li key={job.jobid}>
                            <h4>{job.title}</h4>
                            <p>{job.description}</p>
                            {/* Add more job details as needed */}
                            <Link to={`/jobs/${job.jobid}/view`}>View</Link>
                            <Link to={`/jobs/${job.jobid}/apply`} className="apply-button">Apply</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No current open positions.</p>
            )}
        </div>
    );
};

export default JobList;
