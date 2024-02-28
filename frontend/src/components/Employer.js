import React from 'react';
import Header from './Header';

function Employer() {
    return (
        <div className="employer">
            <h1>For Employers</h1>
            <p>Welcome to our dedicated section for employers.</p>
            <section>
                <h2>Why Partner with Us?</h2>
                <p>Explain the benefits that employers get by partnering with your organization.</p>
            </section>
            <section>
                <h2>Services Offered</h2>
                <p>Detail the services you provide to employers, like job postings, talent search, etc.</p>
            </section>
            <section>
                <h2>Contact Us</h2>
                <p>Provide a form or contact details so that employers can reach out for more information.</p>
            </section>
        </div>
    );
}

export default Employer;
