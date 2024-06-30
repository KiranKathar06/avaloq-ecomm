import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('user');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      sessionStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleLogIn = async () => {
    try {
      navigate('/login');
    } catch (error) {
      console.error('Error logging In:', error.message);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">AvaloqEcomm</a>
        <div className="mx-auto">
        </div>
        <div className="d-flex">
          {isLoggedIn ? (
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          ) : (
          <button className="btn btn-outline-light" onClick={handleLogIn}>LogIn</button>
          )}
        </div>
       </div>
    </nav>
  );
};

export default Navbar;
