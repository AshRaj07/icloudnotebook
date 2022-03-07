import React from "react";
import { useLocation,Link } from "react-router-dom"
const Footer = () => {
  const d = new Date();
  
  let location = useLocation();
  React.useEffect(() => {
  }, [location]);
  return (
    
      <footer className="py-3 my-4 " style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "130px",
        }}
        >
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><Link to="/" className={`nav-link px-2 ${location.pathname==="/"?"link-secondary":"link-dark"}`}>Home</Link></li>
        {/* <li><Link to="/features"className={`nav-link px-2 ${location.pathname==="/features"?"link-secondary":"link-dark"}`}>Features</Link></li> */}
        <li><Link to="/about" className={`nav-link px-2 ${location.pathname==="/about"?"link-secondary":"link-dark"}`}>About Us</Link></li>
        <li><Link to="/contact" className={`nav-link px-2 ${location.pathname==="/contact"?"link-secondary":"link-dark"}`}>Contact Us</Link></li>
      </ul>
        <p className="text-center text-muted">&copy; {d.getFullYear()} Company, Inc</p>
      </footer>
   
  );
};

export default Footer;
