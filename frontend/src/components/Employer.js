import React from 'react';
import Header from './Header';

const Employer = () => {
    return (
        <div className="employer">
            <h1>Employers</h1>
            <div className="company-postings">
                <div className="posting">
                    <h2>Post 1 - Active</h2>
                    <p>Position Summary</p>
                    <button>View Postings</button>
                    <button>Edit</button>
                </div>
                <div className="posting">
                    <h2>Post 2 - Active</h2>
                    <p>Position Summary</p>
                    <button>View Postings</button>
                    <button>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default Employer;

