import { Link } from 'react-router-dom'; 
import backgroundImage from './background.jpg';
import logoImage from './logo.png';

function Home() {
  return (
    <div className="home" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="overlay"></div>
      <div className="home-content">
        <div className="logo">
          <img src={logoImage} alt="Site Logo" />
        </div>
        <br></br>
        <br></br>
        <div className="tagline">
          <h1>Find the Right Job in the Right Company</h1>
          <p>A Place for <span className="highlight">Students</span> to Find Latest Jobs in USA</p>
        </div>
        <div className="cta">
          <Link to="/jobs">
            <button className="btn">Browse Jobs</button> 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;