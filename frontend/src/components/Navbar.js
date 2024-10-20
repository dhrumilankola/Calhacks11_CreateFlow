import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          My Application
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Previous Posts
              </a>
            </li>
            <li className="nav-item">
              <span className="nav-link" style={{ color: '#00f2fe', fontWeight: '500' }}>
                Hello, {userName}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
