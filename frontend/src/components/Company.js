import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Company.css';

const Company = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [jobs, setJobs] = useState([]);

    // Fetch all companies
    useEffect(() => {
        const fetchCompanies = async () => {
            const result = await axios('http://localhost:2000/companies/');
            setCompanies(result.data);
        };

        fetchCompanies();
    }, []);

    // Fetch a specific company
    const fetchCompany = async (uid) => {
        const result = await axios(`http://localhost:2000/companies/${uid}`);
        setSelectedCompany(result.data);
        fetchJobs(uid); // Fetch jobs for the selected company
    };

    // Fetch all jobs from a specific company
    const fetchJobs = async (uid) => {
        const result = await axios(`http://localhost:2000/companies/${uid}/jobs`);
        setJobs(Array.isArray(result.data) ? result.data : []);
    };

    return (
        <div>
            <h1>Companies</h1>
            <ul>
                {companies.map((company) => (
                    <li key={company.uid} onClick={() => fetchCompany(company.uid)}>
                        {company.name}
                    </li>
                ))}
            </ul>

            {selectedCompany && (
                <div>
                    <h2>{selectedCompany.name}</h2>
                    <p>{selectedCompany.description}</p>
                    <h3>Jobs</h3>
                    {Array.isArray(jobs) && jobs.length > 0 && (
                        <ul>
                            {jobs.map((job) => (
                                <li key={job.jobid}>{job.title}</li>
                             ))}
                        </ul>
            )}
                </div>
            )}
        </div>
    );
};

export default Company;
