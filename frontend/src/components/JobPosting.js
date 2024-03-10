import { useState, useEffect } from 'react';
import './JobPosting.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setIsApplying(false);
    }

    const handleCloseJob = () => {
        setSelectedJob(null);
    }

    const handleApply = (job) => {
        setSelectedJob(job);
        setIsApplying(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicantData({ ...applicantData, [name]: value });
    };

    const handleFileChange = (e) => {
        setApplicantData({ ...applicantData, resume: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', applicantData.name);
        formData.append('email', applicantData.email);
        formData.append('resume', applicantData.resume);
        formData.append('position', selectedJob.title); // Assuming job title is used as position

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
            <input 
                type="text"
                placeholder="Search by title, location, description..."
                value={searchTerm}
                onChange={handleSearch}  
            />

            <div className="job-posting-results">
                {Object.keys(filteredJobs).map(companyId => (
                    <div key={companyId} className="company-jobs">
                        <h2>Company: {companies[companyId] || 'Unknown'}</h2>
                        {Object.keys(filteredJobs[companyId]).map(jobId => (
                            <div key={jobId} className="job-posting">
                                <h3>{filteredJobs[companyId][jobId].title}</h3>
                                <p>Location: {filteredJobs[companyId][jobId].location}</p>
                                <p>Description: {filteredJobs[companyId][jobId].description}</p>
                                <div className="job-actions">
                                    <Link to={`/jobs/${jobId}`} className="view-button">View</Link>
                                    <Link to={`/apply/${jobId}`} className="apply-button">Apply</Link>
                                </div>

                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {selectedJob && <JobDetails job={selectedJob} onClose={handleCloseJob} />}
            
        </div>
    );
}

export default JobPosting;