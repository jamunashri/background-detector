import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <h1>Contact</h1>
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/jamunashri-shanmugasundaram/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer noopener">
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://twitter.com/s_jamunashri"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://stackoverflow.com/users/14301471/jamunashri-shanmugasundaram"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: "white", fontSize: "2rem" }}
        >
          <i className="fa fa-stack-overflow"></i>
        </a>
      </div>
      <p style={{ color: "white", margin: "1rem", paddingTop: "2rem" }}>
        Jamunashri Shanmugasundaram &copy; 2021
      </p>
    </footer>
  );
};

export default Footer;
