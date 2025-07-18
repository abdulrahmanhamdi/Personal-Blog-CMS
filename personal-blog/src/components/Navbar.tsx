// src/components/Navbar.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Blog Admin</a>
        {user && <LogoutButton />}
      </div>
    </nav>
  );
};

export default Navbar;