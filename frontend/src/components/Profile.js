import React, { useState } from 'react';
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

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);

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

  const handleImageSelect = (event) => {
    // Handle image selection
  };

  const handleSave = async () => {
    try {
      const profileData = {
        uid: 'm5O5FZy6hEYwKRDHngxU6J8Mpxn1', 
        firstName: '', 
        lastName: '', 
        email: '', 
        title: formData.title,
        summary: formData.summary,
        education: [
          {
            school: education.school,
            degree: education.degree,
            fieldOfStudy: education.fieldOfStudy,
            startDate: education.startDate,
            endDate: education.endDate,
            summary: education.summary,
          },
        ],
        experience: experiences.map((exp) => ({
          title: exp.title,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          summary: exp.description,
        })),
      };
  
      /*const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authentication token)
        },
        body: JSON.stringify(profileData),
      });
  
      if (response.ok) {
        console.log('Profile saved successfully!');
        
      } else {
        console.error('Failed to save profile:', response.statusText);
       
      }
    } catch (error) {
      console.error('Error saving profile:', error.message);
      
    }
  };   */

      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //authentication token
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        console.log('Profile saved successfully!');
        
      } else {
        console.error('Failed to save profile:', response.statusText);
      
      }
    } catch (error) {
      console.error('Error saving profile:', error.message);
      
    }
  };

  const addExperience = () => {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        id: prevExperiences.length + 1,
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

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
          <label>DOB:</label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
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
            value={education.school}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
          <label>Degree:</label>
          <input
            name="degree"
            value={education.degree}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
          <label>Field of Study:</label>
          <input
            name="fieldOfStudy"
            value={education.fieldOfStudy}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={education.startDate}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={education.endDate}
            onChange={handleEducationChange}
          />
        </div>

        <div className="field">
          <label>Education Summary:</label>
          <textarea
            rows="4"
            name="summary"
            value={education.summary}
            onChange={handleEducationChange}
          />
        </div>
      </div>

      <div className="section">
        <h3>Work Experience</h3>

        {experiences.map((exp) => (
          <div key={exp.id} className="experience">
            <input
              placeholder="Title"
              value={exp.title}
              onChange={(e) =>
                updateExperience(exp.id, 'title', e.target.value)
              }
            />

            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(exp.id, 'company', e.target.value)
              }
            />

            <input
              placeholder="Location"
              value={exp.location}
              onChange={(e) =>
                updateExperience(exp.id, 'location', e.target.value)
              }
            />

<div className="form-group">
      <label>Start Date:</label>
      <input
        type="date"
        placeholder="Start Date"
        value={exp.startDate}
        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>End Date:</label>
      <input
        type="date"
        placeholder="End Date"
        value={exp.endDate}
        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
      />
    </div>

            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) =>
                updateExperience(exp.id, 'description', e.target.value)
              }
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
