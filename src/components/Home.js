import { Link } from 'react-router-dom'; 

const jobData =  [
  {id: 1, title: 'Software Developer'}, 
  {id: 2, title: 'Frontend Engineer'}
];

function Grid({children}) {
  return (
    <div className="grid">
      {children}
    </div>
  );
}

function Home() {

  return (
    <Grid>
      <header>
        <div className="header-title">  
          Skill Checker
        </div>
        <nav>
          <Link to="/profile">Profile</Link> 
        </nav>
      </header>

      <main>
        <section>
          <h2>Latest Jobs</h2>
          {
            jobData.map(job => (
              <div key={job.id}>{job.title}</div> 
            ))
          }
        </section>  

        <section>
         <h2>Top Companies</h2> 
        </section>
      </main>
    </Grid>
  );
}
  
 export default Home;