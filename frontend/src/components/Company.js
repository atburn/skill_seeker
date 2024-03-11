import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Company.css';
import JobList from './JobList';

const CompanyList = ({ onSelectCompany }) => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            const response = await axios('http://localhost:2000/companies/');
            setCompanies(response.data);
        };
        fetchCompanies();
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text"
                    placeholder="Search for companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"   
                />
                <button className="search-button">Search</button>
            </div>
            <ul>
                {filteredCompanies.map((company) => (
                    <li key={company.uid}>
                        <Link to={`/companies/${company.uid}`} onClick={() => onSelectCompany(company.uid)}>
                            {company.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Company = () => {
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            if (selectedCompanyId) {
                const response = await axios(`http://localhost:2000/companies/${selectedCompanyId}`);
                setCompanyDetails(response.data);
            }
        };
        fetchCompanyDetails();
    }, [selectedCompanyId]);

    return (
        <div>
            <h1>Companies</h1>
            <CompanyList onSelectCompany={setSelectedCompanyId} />
            {selectedCompanyId && companyDetails && (
                <div>
                    <h2>{companyDetails.name}</h2>
                    <p>Industry: {companyDetails.industry}</p>
                    <p>Location: {companyDetails.location}</p>
                    <p>Email: {companyDetails.email}</p>
                    <p>Description: {companyDetails.summary}</p>
                    <JobList companyId={selectedCompanyId} />
                </div>
            )}
        </div>
    );
};

export default Company;
