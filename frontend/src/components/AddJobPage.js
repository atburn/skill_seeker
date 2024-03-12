import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddJobPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [jobQualifications, setJobQualifications] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:2000/companies/${companyId}/jobs`, {
        title: jobTitle,
        location: jobLocation,
        description: jobDescription,
        responsibilities: jobResponsibilities,
        qualifications: jobQualifications,
      }, {
        headers: {
          'sender-uid': companyId,
        },
      });
      console.log(response.data);
      navigate(`/companies/${companyId}`);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="add-job-page">
      <div className="add-job-header">
        <h2>Add New Job</h2>
        <button onClick={() => navigate(`/companies/${companyId}`)}>Back to Company</button>
      </div>
      <form onSubmit={handleSubmit} className="add-job-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Responsibilities:</label>
          <textarea value={jobResponsibilities} onChange={(e) => setJobResponsibilities(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Qualifications:</label>
          <textarea value={jobQualifications} onChange={(e) => setJobQualifications(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Create Job</button>
      </form>
    </div>
  );
}
export default AddJobPage;