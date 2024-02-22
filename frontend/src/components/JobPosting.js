
import { useState } from 'react';

function JobListings() {

  const [searchTerm, setSearchTerm] = useState('');
  const [skillsFilter, setSkillsFilter] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleCheckbox = (event) => {
    
  }

  return (
    <div className="job-listings">

      {/* Search Bar */}
      <input 
        type="text"
        placeholder="Search by title, company..."
        value={searchTerm}
        onChange={handleSearch}  
      />

      {/* Skills Filter */}
      <div className="skills-filter">
        <input type="checkbox" value="Java"/> Java
        <input type="checkbox" value="Python"/> Python
        
  
      </div>

 

    </div>
  );
}

export default JobListings;