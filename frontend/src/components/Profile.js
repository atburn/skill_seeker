import React from 'react';
import { useState } from 'react';


function Profile() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    address: '',
    city: '',
    state: '',
    zip: '' 
  });;

  const [image, setImage] = useState(null);

  const handleInputChange = (event) => {
    // Update form data state
  }

  const handleImageSelect = (event) => {
    // Get selected image  
  }

  const handleSave = () => {
    // Submit to backend  
  }
  const [experiences, setExperiences] = useState([]);

  const addExperience = () => {
    setExperiences([...experiences, {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '', 
      description: ''
    }]);
  }
  
  const updateExperience = (id, field, value) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === id ? {...exp, [field]: value} : exp  
    ));
  }



  return (
    <div className="profile">
  
      <h1>My Profile</h1>
  
      <div className="section">
        <h3>Add Profile Picture</h3>
        
        <div className="picture">
          {image && <img src={image} />}
          
          <button>Upload</button>
          <input type="file" onChange={handleImageSelect}/>
        </div>
  
      </div>
  
      <div className="section">
        <h3>Basic Information</h3>
        
        <div className="field">
          <label>Name:</label> 
          <input 
            name="name"
            value={formData.name}
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
  
      </div>
  
      <div className="section">
        <h3>Career Summary</h3>   
        
        <textarea
          rows="4"
          value={formData.summary}
          onChange={handleInputChange}
        />
  
      </div>
      <div className="section">
        <h3>Work Experience</h3>
        
        {experiences.map(exp => (
          <div key={exp.id} className="experience">
            <input 
              value={exp.title}
              onChange={e => updateExperience(exp.id, 'title', e.target.value)} 
            />
            
            {/* other fields */}
            
          </div>
        ))}

        <button onClick={addExperience}>Add Experience</button>
      </div>
      <button>Save Profile</button>
  
    </div>

  );

  }
export default Profile;




