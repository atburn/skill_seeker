import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CompanyDetailPage.css'; 

function CompanyDetailPage() {
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/companies/${companyId}`);
                setCompany(response.data);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };

        fetchCompany();
    }, [companyId]);

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div className="company-detail-page">
            <h1>{company.name}</h1>
            <p><strong>Location:</strong> {company.location}</p>
            <p><strong>Description:</strong> {company.description}</p>
            <p><strong>Industry:</strong> {company.industry}</p>
            <br></br>
            <Link to="/company">Back to Main Companies Page</Link>
        </div>
    );
}

export default CompanyDetailPage;
