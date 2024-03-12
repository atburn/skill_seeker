import { useState, useEffect } from 'react';
import './JobPosting.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function JobDetails({ job, onClose }) {
    return (
        <div className="job-details">
            <h2>{job.title}</h2>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>
            <p>Responsibilities: {job.responsibilities}</p>
            <p>Qualifications: {job.qualifications}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

function JobApplicationForm({ job, onSubmit, onInputChange, handleInputChange, onFileChange }) {
    return (
        <div className="job-application-container">
            <h1>Apply for {job.title}</h1>
            <form onSubmit={onSubmit} className="job-application-form">
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input type="text" name="name" onChange={onInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" onChange={onInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Resume (PDF only):</label>
                    <input type="file" name="resume" onChange={onFileChange} accept=".pdf" className="form-input" />
                </div>
                <button type="submit" className="submit-btn">Submit Application</button>
            </form>
        </div>
    );
}

function JobPosting() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState({});
    const [companies, setCompanies] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [applicantData, setApplicantData] = useState({
        name: '',
        email: '',
        qualifications: '',
        responsibilities: '',
        resume: null,
    });
   
    const [externalSearchTerm, setExternalSearchTerm] = useState('');
    const [externalJobs, setExternalJobs] = useState([]);

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
                obj[company.uid] = company.name;
                return obj;
            }, {});
            setCompanies(companiesById);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const fetchExternalJobs = async () => {
        try {
            const response = await axios.get('http://localhost:2000/jobs/external', {
                params: {
                    query: searchTerm
                }
            });
            console.log("external")
            console.log(response.data)
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching external job information:', error);
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleViewJob = (job) => {
        setSelectedJob(job);
        navigate(`/jobs/${job.id}`, { state: { job } });
    };

    const handleCloseJob = () => {
        setSelectedJob(null);
    }

    const handleApply = (jobId) => {
        setSelectedJob(jobId);
        setIsApplying(true);
        navigate(`/apply/${jobId}`);
        
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicantData({ ...applicantData, [name]: value });
    };

    const handleFileChange = (e) => {
        setApplicantData({ ...applicantData, resume: e.target.files[0] });
    };

    const handleExternalSearch = async () => {
        try {
            const response = await axios.get(`/jobs/external?query=${externalSearchTerm}`);
            const firstJob = response.data[Object.keys(response.data)[0]]; // Get the first job
            setSelectedJob(firstJob); // Set the first job as the selected job
            setIsApplying(true); // Show the job details as a pop-up window
        } catch (error) {
            console.error('Error fetching external job information:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', applicantData.name);
        formData.append('email', applicantData.email);
        formData.append('resume', applicantData.resume);
        formData.append('position', selectedJob.title); 

        try {
            const response = await axios.post('http://localhost:2000/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            setIsApplying(false); // Close form upon submission
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Application submission error:', error);
        }
    };

    const filteredJobs = Object.keys(jobs).reduce((filtered, companyId) => {
        const companyJobs = jobs[companyId];
    
        const filteredCompanyJobs = Object.keys(companyJobs).filter(jobId => {
            const job = companyJobs[jobId];
            console.log(job);
            return (
                (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }).reduce((obj, jobId) => {
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
            <h2>Search for Jobs</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title, location, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Search</button>
            </div>
    
            <div className="job-posting-results">
                {Object.entries(filteredJobs).map(([companyId, companyJobs]) => (
                    <div key={companyId} className="company-jobs">
                        <h2>{companies[companyId]}</h2>
                        {Object.entries(companyJobs).map(([jobId, job]) => (
                            <div key={jobId} className="job-item">
                                <h3>{job.title}</h3>
                                <p>Location: {job.location}</p>
                                <p>Description: {job.description}</p>
                                <div className="job-actions">
                                    <button className="view-button" onClick={() => handleViewJob(job)}>View Details</button>
                                    <button className="apply-button" onClick={() => handleApply(job.id)}>Apply</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
    
            {selectedJob && (
                <JobDetails job={selectedJob} onClose={handleCloseJob} />
            )}
    
            {isApplying && (
                <JobApplicationForm
                    job={selectedJob}
                    onSubmit={handleSubmit}
                    onInputChange={handleInputChange}
                    handleInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                />
            )}
        </div>
    );
}

export default JobPosting;