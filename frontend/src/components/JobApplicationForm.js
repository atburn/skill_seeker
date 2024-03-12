import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './JobApplicationForm.css';

function JobApplicationForm() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState({
    company: '',
  });
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      senderUID: localStorage.getItem('uid'),
      name: applicantData.name,
      email: applicantData.email,
    };
    try {
      await axios.post(`http://localhost:2000/apply/${jobId}`, applicationData, {
        headers: {
          'sender-uid': localStorage.getItem('uid'),
        },
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
      <div className="job-details">
        <p>Company: {jobDetails.company}</p>
      </div>
      <form className="job-application-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={applicantData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={applicantData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
      <Link to="/jobs" className="back-to-listings">
        Back to Job Listings
      </Link>
    </div>
  );
}

export default JobApplicationForm;