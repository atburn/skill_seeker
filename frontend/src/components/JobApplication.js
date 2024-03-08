import React, { useState } from 'react';
import axios from 'axios';
import './JobApplication.css';  

const JobApplication = () => {
    const [applicantData, setApplicantData] = useState({
        name: '',
        email: '',
        resume: null,
        position: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicantData({ ...applicantData, [name]: value });
    };

    // Handle file changes
    const handleFileChange = (e) => {
        setApplicantData({ ...applicantData, resume: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', applicantData.name);
        formData.append('email', applicantData.email);
        formData.append('resume', applicantData.resume);
        formData.append('position', applicantData.position);

        // Posting data to the server
        try {
            const response = await axios.post('http://localhost:2000/apply/uid', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data); // Log server response
        } catch (error) {
            console.error('Application submission error:', error);
        }
    };

    // Rendering the form
    return (
        <div className="job-application-container">
            <h1>Apply for a Job</h1>
            <form onSubmit={handleSubmit} className="job-application-form">
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input type="text" name="name" value={applicantData.name} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" value={applicantData.email} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Position:</label>
                    <input type="text" name="position" value={applicantData.position} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Resume (PDF only):</label>
                    <input type="file" name="resume" onChange={handleFileChange} accept=".pdf" className="form-input" />
                </div>
                <button type="submit" className="submit-btn">Submit Application</button>
            </form>
        </div>
    );
};

export default JobApplication;
