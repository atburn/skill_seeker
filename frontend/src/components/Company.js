import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Company.css';
import JobList from './JobList';

const CompanyList = ({ onSelectCompany }) => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const response = await axios('http://localhost:2000/companies/');
            setCompanies(response.data);
        };

        fetchCompanies();
    }, []);

    return (
        <ul>
            {companies.map((company) => (
                <li key={company.uid}>
                    <Link to={`/companies/${company.uid}`} onClick={() => onSelectCompany(company)}>
                        {company.name}
                    </Link>
                </li>
            ))}
        </ul>
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
