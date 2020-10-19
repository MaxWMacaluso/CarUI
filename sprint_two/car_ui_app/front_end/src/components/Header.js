import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Car UI App</h1>
      <div className="links">
        <Link to="/logout" className="link">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;