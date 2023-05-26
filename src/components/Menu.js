import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="container">
      <div className="">
        <button className="bg bg-warning m-4">
          <Link to="/" style={{ color: '#000' }}>
            Employee List By Json-Server
          </Link>
        </button>
        <button className="bg bg-warning">
          <Link to="/userlist" style={{ color: '#000' }}>
            User List By Json-PlaceHolder
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Menu;
