import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewProfile.css';

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = localStorage.getItem('uid');
        const response = await axios.get(`http://localhost:2000/users/${uid}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate('/profile');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="section">
        <h3>Basic Information</h3>
        <div className="field">
          <label>First Name:</label>
          <span>{user.firstName}</span>
        </div>
        <div className="field">
          <label>Last Name:</label>
          <span>{user.lastName}</span>
        </div>
        <div className="field">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        <div className="field">
          <label>Title:</label>
          <span>{user.title}</span>
        </div>
        <div className="field">
          <label>Summary:</label>
          <p>{user.summary}</p>
        </div>
      </div>
      <div className="section">
        <h3>Education</h3>
        {user.education.map((edu, index) => (
          <div key={index} className="education">
            <h4>{edu.degree} in {edu.fieldOfStudy}</h4>
            <p>{edu.school}</p>
            <p>{edu.startDate} - {edu.endDate || 'Present'}</p>
            <p>{edu.summary}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>Experience</h3>
        {user.experience.map((exp, index) => (
          <div key={index} className="experience">
            <h4>{exp.title}</h4>
            <p>{exp.company}, {exp.location}</p>
            <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
            <p>{exp.summary}</p>
          </div>
        ))}
      </div>

      <div className="section">
  <h3>Applied Jobs</h3>
  {user.appliedJobs.map((job, index) => (
    <div key={index} className="applied-job">
      <h4>{job.title}</h4>
      <p>{job.company}</p>
      <p>Status: {job.status}</p>
    </div>
  ))}
</div>


      <button className="button" onClick={handleEditProfile}>
          Edit Profile
        </button>
    </div>
  );
};

export default ViewProfile;