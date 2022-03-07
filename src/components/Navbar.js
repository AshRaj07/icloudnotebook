import React from 'react'
import { useLocation,Link, useHistory } from "react-router-dom"

const Navbar = () => {

  const history = useHistory();
 

  const handleLogout = () =>{
    localStorage.removeItem('token');
    history.push("/login");
  }
  
  let location = useLocation();
  React.useEffect(() => {
  }, [location]);

    return (
        <div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
     
   < div className="col-md-3">
       <h4>iCloudNoteBook</h4>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><Link to="/" className={`nav-link px-2 ${location.pathname==="/"?"link-secondary":"link-dark"}`}>Home</Link></li>
        {/* <li><Link to="/features"className={`nav-link px-2 ${location.pathname==="/features"?"link-secondary":"link-dark"}`}>Features</Link></li> */}
        <li><Link to="/about" className={`nav-link px-2 ${location.pathname==="/about"?"link-secondary":"link-dark"}`}>About Us</Link></li>
        <li><Link to="/contact" className={`nav-link px-2 ${location.pathname==="/contact"?"link-secondary":"link-dark"}`}>Contact Us</Link></li>
      </ul>

      { !localStorage.getItem('token')? <div className="col-md-3 text-end">
   {location.pathname!=="/login"?<Link role="button" to="/login" className="btn btn-outline-primary me-2">Login</Link>:
    <Link role="button" to="/signup" className="btn btn-primary">Sign-up</Link>}
      </div>:<button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
    </header>
  </div>

    )
}

export default Navbar
