import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewProfile.css';

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/search/users/${searchQuery}`);
      if (response.data.length > 0) {
        setSearchedUser(response.data[0]);
      } else {
        setSearchedUser(null);
      }
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };

  const renderUserProfile = (userData) => {
    return (
      <>
        <div className="section">
          <h3>Basic Information</h3>
          <div className="field">
            <label>First Name:</label>
            <span>{userData.firstName}</span>
          </div>
          <div className="field">
            <label>Last Name:</label>
            <span>{userData.lastName}</span>
          </div>
          <div className="field">
            <label>Email:</label>
            <span>{userData.email}</span>
          </div>
          <div className="field">
            <label>Title:</label>
            <span>{userData.title}</span>
          </div>
          <div className="field">
            <label>Summary:</label>
            <p>{userData.summary}</p>
          </div>
        </div>
        <div className="section">
          <h3>Education</h3>
          {userData.education.map((edu, index) => (
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
          {userData.experience.map((exp, index) => (
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
          {userData.appliedJobs.map((job, index) => (
            <div key={index} className="applied-job">
              <h4>{job.title}</h4>
              <p>{job.company}</p>
              <p>Status: {job.status}</p>
            </div>
          ))}
        </div>
        {userData.uid === localStorage.getItem('uid') && (
          <button className="button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        )}
      </>
    );
  };

  return (
    <div className="profile">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a user by first name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchedUser ? (
        renderUserProfile(searchedUser)
      ) : (
        user && renderUserProfile(user)
      )}
    </div>
  );
};

export default ViewProfile;