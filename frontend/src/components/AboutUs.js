import React from 'react';
import './AboutUs.css'; // Make sure you have the CSS file in the correct path

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1>About Skill Seeker</h1>
            <p>Welcome to Skill Seeker, the ultimate platform dedicated to bridging the gap between talented individuals and their dream careers. At Skill Seeker, we believe that everyone possesses unique skills and potentials waiting to be discovered. Our mission is to empower you to unlock your capabilities and steer your professional journey towards success.</p>
            <p>Founded in 2024, Skill Seeker has grown into a vibrant community where job seekers can find extensive resources, from skill development tutorials to the latest industry insights. Our platform is designed to cater to diverse professionals, whether you're starting your career, seeking to advance, or exploring new paths.</p>
            <p>At Skill Seeker, we prioritize your growth and development.</p>
            <h2>Our Team</h2>
            <p>Our team consists of dedicated professionals passionate about education and skill development. Our team is dedicated to providing personalized support and guidance to help you navigate your career path with confidence. We collaborate with leading companies and educational institutions to bring you the best opportunities and learning materials.</p>
            <p>Join us on this journey to explore, learn, and achieve. Discover the endless possibilities with Skill Seeker and take the first step towards a fulfilling and successful career.</p>
            <h2>Contact Us</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            <p>Email us at: <a href="mailto:contact@skillseeker.com">contact@skillseeker.com</a></p>
            <div className="social-links">
                {/* Add your social media links here */}
                <a href="https://www.facebook.com/skillseeker">Facebook</a>
                <a href="https://www.twitter.com/skillseeker">Twitter</a>
                <a href="https://www.linkedin.com/company/skillseeker">LinkedIn</a>
            </div>
        </div>
    );
};

export default AboutUs;
