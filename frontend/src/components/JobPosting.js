import { useState, useEffect } from 'react';
import './JobPosting.css'; 
import axios from 'axios';
function JobPosting() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            
            const response = await axios.get('/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching job information:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="job-posting">
            {/* Search Bar */}
            <input 
                type="text"
                placeholder="Search by title, company..."
                value={searchTerm}
                onChange={handleSearch}  
            />

            {/* Job Posting */}
            <div className="job-posting-results">
                {filteredJobs.map(job => (
                    <div key={job.id} className="job-posting">
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Description: {job.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobPosting;
