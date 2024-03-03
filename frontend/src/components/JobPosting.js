
import { useState } from 'react';
import './JobPosting.css'; 

function JobPosting() {
    const [searchTerm, setSearchTerm] = useState('');
    const [skillsFilter, setSkillsFilter] = useState([]);

    // Dummy job data
    const jobs = [
        { id: 1, title: "Software Engineer", company: "Tech Innovations", skills: ["Java", "Python"] },
        { id: 2, title: "Data Scientist", company: "DataWiz", skills: ["Python", "R"] },
        // Add more job listings here
    ];

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleCheckbox = (skill) => {
        setSkillsFilter(skillsFilter.includes(skill) ? 
                        skillsFilter.filter(s => s !== skill) : 
                        [...skillsFilter, skill]);
    }

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skillsFilter.includes(skill))
    );

    return (
        <div className="job-posting">
            {/* Search Bar */}
            <input 
                type="text"
                placeholder="Search by title, company..."
                value={searchTerm}
                onChange={handleSearch}  
            />

            {/* Skills Filter */}
            <div className="skills-filter">
                {["Java", "Python", "R"].map(skill => (
                    <label key={skill}>
                        <input 
                            type="checkbox" 
                            value={skill}
                            checked={skillsFilter.includes(skill)}
                            onChange={() => handleCheckbox(skill)}
                        /> 
                        {skill}
                    </label>
                ))}
            </div>

            {/* Job Posting */}
            <div className="job-posting-results">
                {filteredJobs.map(job => (
                    <div key={job.id} className="job-posting">
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <ul>
                            {job.skills.map(skill => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobPosting;
