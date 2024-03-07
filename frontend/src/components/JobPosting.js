import { useState, useEffect } from 'react';
import './JobPosting.css';
import axios from 'axios';

function JobPosting() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState({});
    const [companies, setCompanies] = useState({});

    useEffect(() => {
        fetchJobs();
        fetchCompanies();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:2000/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching job information:', error);
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:2000/companies');
            const companiesById = response.data.reduce((obj, company) => {
                obj[company.uid] = company.name; // Store company name by its ID
                return obj;
            }, {});
            setCompanies(companiesById);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredJobs = Object.keys(jobs).reduce((filtered, companyId) => {
        const companyJobs = jobs[companyId];

        const filteredCompanyJobs = Object.keys(companyJobs).filter(jobId =>
            companyJobs[jobId].title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            companyJobs[jobId].location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            companyJobs[jobId].description.toLowerCase().includes(searchTerm.toLowerCase())
        ).reduce((obj, jobId) => {
            obj[jobId] = companyJobs[jobId];
            return obj;
        }, {});

        if (Object.keys(filteredCompanyJobs).length > 0) {
            filtered[companyId] = filteredCompanyJobs;
        }

        return filtered;
    }, {});

    return (
        <div className="job-posting">
            {/* Search Bar */}
            <input 
                type="text"
                placeholder="Search by title, location, description..."
                value={searchTerm}
                onChange={handleSearch}  
            />

            {/* Job Posting */}
            <div className="job-posting-results">
                {Object.keys(filteredJobs).map(companyId => (
                    <div key={companyId} className="company-jobs">
                        <h2>Company: {companies[companyId] || 'Unknown'}</h2> {/* Display company name */}
                        {Object.keys(filteredJobs[companyId]).map(jobId => (
                            <div key={jobId} className="job-posting">
                                <h3>{filteredJobs[companyId][jobId].title}</h3>
                                <p>Location: {filteredJobs[companyId][jobId].location}</p>
                                <p>Description: {filteredJobs[companyId][jobId].description}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobPosting;
