import React, { useState } from 'react';
import axios from 'axios';
import './Company.css';

function Company() {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const jobData = {
            title: jobTitle,
            location: location,
            description: description,
        };
        
        try {
            const response = await axios.post('http://localhost:2000/companies/{companyId}/jobs', jobData);
            console.log(response.data);
            alert('Job posted successfully!');
            // Clear form fields after submission
            setJobTitle('');
            setLocation('');
            setDescription('');
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job.');
        }
    };

    return (
        <div className="company-form">
            <h2>Post a Job Opening</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Job Title</label>
                    <input 
                        type="text" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
}

export default Company;
