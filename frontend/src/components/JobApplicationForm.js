import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; 
import './JobApplicationForm.css';

function JobApplicationForm () {
    const { jobId } = useParams();
    const [jobTitle, setJobTitle] = useState('');

    useEffect(() => {
        
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/jobs/${jobId}`);
                setJobTitle(response.data.title); 
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [jobId]); 
    

    const [applicantData, setApplicantData] = useState({
        name: '',
        email: '',
        resume: null, 
    });

    // Handle input changes (for text inputs)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicantData({ ...applicantData, [name]: value });
    };

    // Handle file changes (for the resume upload)
    const handleFileChange = (e) => {
        setApplicantData({ ...applicantData, resume: e.target.files[0] }); // The file itself is at index 0
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', applicantData.name);
        formData.append('email', applicantData.email);
        formData.append('resume', applicantData.resume);
        formData.append('jobTitle', jobTitle); // Send the job title along with the application

        try {
            
            const response = await axios.post('http://loclahost:2000/apply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Response handling
            console.log('Success:', response.data);
            alert('Application submitted successfully!');
            // Clear form or redirect user
        } catch (error) {
            console.error('Application submission error:', error);
            alert('Error submitting application. Please try again.');
        }
    };

    return (
        <div className="job-application-container">
            <h2>Apply for {jobTitle}</h2>
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
                    <label>Resume (PDF only):</label>
                    <input type="file" name="resume" onChange={handleFileChange} accept=".pdf" required />
                </div>
                <button type="submit" className="submit-btn">Submit Application</button>
                
            </form>
            <br></br>
            <Link to="/jobs" className="back-to-listings">Back to Job Listings</Link>
        </div>
    );
};

export default JobApplicationForm;
