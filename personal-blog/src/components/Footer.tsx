// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <Link to="/" className="me-3">Home</Link>
          <Link to="/login" className="me-3">Login</Link>
          <Link to="/signup" className="me-3">Sign Up</Link>
          <Link to="/about">About</Link>
        </div>
        <p>&copy; 2025 Blog App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;