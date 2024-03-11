import React, { useState, useEffect } from 'react';
import './Profile.css';
function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    summary: '',
    experience: [],
    education: [],
  });



  const [education, setEducation] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    summary: '',
  });
  

  
  const [experiences, setExperiences] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };


  const handleSave = async () => {
    try {
      const uid = localStorage.getItem('uid');
      const profileData = {
        senderUID: uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        title: formData.title,
        summary: formData.summary,
        education: [education],
        experience: experiences,
      };

      const response = await fetch(`http://localhost:2000/users/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "sender-uid": uid
        },
        body: JSON.stringify(profileData),
      });
  
      if (response.ok) {
        console.log('Profile saved successfully!');
        window.location.href = '/view-profile'; // Redirect to the profile page
      } else {
        console.error('Failed to save profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  };


  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
  
    setExperiences((prevExperiences) => [...prevExperiences, newExperience]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };



    useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const uid = localStorage.getItem('uid');
        const response = await fetch(`http://localhost:2000/users/${uid}`);
        const data = await response.json();
        setFormData(data);
        setEducation(data.education[0]);
        setExperiences(data.experience);
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };
  
    fetchProfileData();
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>

      

      <div className="section">
        <h3>Basic Information</h3>

        <div className="field">
  <label>First Name:</label>
  <input
    name="firstName"
    value={formData.firstName}
    onChange={handleInputChange}
  />
</div>

<div className="field">
  <label>Last Name:</label>
  <input
    name="lastName"
    value={formData.lastName}
    onChange={handleInputChange}
  />
</div>
<div className="field">
  <label>Title:</label>
  <input
    name="title"
    value={formData.title}
    onChange={handleInputChange}
  />
</div>
        <div className="field">
          <label>Summary:</label>
          <textarea
            rows="4"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="section">
        <h3>Education</h3>

        <div className="field">
          <label>School:</label>
          <input
            name="school"
            value={education?.school}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
          <label>Degree:</label>
          <input
            name="degree"
            value={education?.degree}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
          <label>Field of Study:</label>
          <input
            name="fieldOfStudy"
            value={education?.fieldOfStudy}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
  <label>Start Date:</label>
  <input
    type="text"
    name="startDate"
    value={education?.startDate}
    onChange={handleEducationChange}
    placeholder="MM/yyyy"
  />
</div>

<div className="field">
  <label>End Date:</label>
  <input
    type="text"
    name="endDate"
    value={education?.endDate}
    onChange={handleEducationChange}
    placeholder="MM/yyyy"
  />
</div>

        <div className="field">
          <label>Education Summary:</label>
          <textarea
            rows="4"
            name="summary"
            value={education?.summary}
            onChange={handleEducationChange}
          />
        </div>
      </div>

      <div className="section">
        <h3>Work Experience</h3>

        {experiences.map((exp, index) => (
  <div key={index} className="experience">
    <input
      placeholder="Title"
      value={exp.title || ''}
      onChange={(e) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          title: e.target.value,
        };
        setExperiences(updatedExperiences);
      }}
    />

<input
      placeholder="Company"
      value={exp.company || ''}
      onChange={(e) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          company: e.target.value,
        };
        setExperiences(updatedExperiences);
      }}
    />

    <input
      placeholder="Location"
      value={exp.location || ''}
      onChange={(e) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          location: e.target.value,
        };
        setExperiences(updatedExperiences);
      }}
    />
<div className="form-group">
      <label>Start Date:</label>
      <input
        type="text"
        placeholder="MM/yyyy"
        value={exp.startDate || ''}
        onChange={(e) => {
          const updatedExperiences = [...experiences];
          updatedExperiences[index] = {
            ...updatedExperiences[index],
            startDate: e.target.value,
          };
          setExperiences(updatedExperiences);
        }}
      />
    </div>

    <div className="form-group">
      <label>End Date:</label>
      <input
        type="text"
        placeholder="MM/yyyy"
        value={exp.endDate || ''}
        onChange={(e) => {
          const updatedExperiences = [...experiences];
          updatedExperiences[index] = {
            ...updatedExperiences[index],
            endDate: e.target.value,
          };
          setExperiences(updatedExperiences);
        }}
      />
    </div>

    
  <textarea
  placeholder="Description"
  value={exp.description || ''}
  onChange={(e) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      description: e.target.value,
    };
    setExperiences(updatedExperiences);
  }}
/>
</div>
))}

        <button onClick={addExperience}>Add Experience</button>
      </div>

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}

export default Profile;
