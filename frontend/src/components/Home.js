import { Link } from 'react-router-dom'; 
import backgroundImage from './background.jpg';
import logoImage from './logo.png';
function Home() {

  return (
    <div className="home" style={{backgroundImage: `url(${backgroundImage})`}}>
     <div className="logo">
        <img src={logoImage} alt="Site Logo" />
      </div>

      <div className="tagline">
      <h3>A Place for <span className="underline">Students</span> to Find Latest Jobs in USA</h3>
        <p>
          Latest New Grads/Internships for UW Students  
        </p>
      </div>



      <div className="quote">
        <h1 style={{color: '#0077ff'}}>
           Find the Right Job in the Right Company
        </h1>
        
        <Link to="/jobs">
           <button className="btn">Browse Jobs</button> 
        </Link>

      </div>

    </div>
  );

}

export default Home;