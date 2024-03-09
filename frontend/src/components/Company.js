import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Company.css';

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
    const [selectedCompany, setSelectedCompany] = useState(null);
    
    return (
        <div>
            <h1>Companies</h1>
            <CompanyList onSelectCompany={setSelectedCompany} />
           
        </div>
    );
};

export default Company;
