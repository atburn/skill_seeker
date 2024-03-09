import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './JobApplicationForm.css';

function JobApplicationForm() {
    const { jobId } = useParams();
    const [jobDetails, setJobDetails] = useState({
        title: '',
        qualifications: '',
        responsibilities: ''
    });
    const [applicantData, setApplicantData] = useState({
        name: '',
        email: '',
        qualifications: '',
        responsibilities: '',
        resume: null,
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/jobs/${jobId}`);
                setJobDetails(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
        fetchJobDetails();
    }, [jobId]);

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
        formData.append('qualifications', applicantData.qualifications);
        formData.append('responsibilities', applicantData.responsibilities);
        formData.append('resume', applicantData.resume);
        try {
            await axios.post('http://localhost:2000/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Application submission error:', error);
            alert('Error submitting application. Please try again.');
        }
    };

    return (
        <div className="job-application-container">
            <h2>Apply for {jobDetails.title}</h2>
            <form className="job-application-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={applicantData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={applicantData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Qualifications:</label>
                    <textarea name="qualifications" value={applicantData.qualifications} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Responsibilities:</label>
                    <textarea name="responsibilities" value={applicantData.responsibilities} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Resume (PDF only):</label>
                    <input type="file" name="resume" onChange={handleFileChange} accept=".pdf" required />
                </div>
                <button type="submit" className="submit-btn">Submit Application</button>
            </form>
            <Link to="/jobs" className="back-to-listings">Back to Job Listings</Link>
        </div>
    );
}

export default JobApplicationForm;
