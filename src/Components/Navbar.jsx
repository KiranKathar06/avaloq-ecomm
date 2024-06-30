import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';

const Navbar = () => {
  const navigate = useNavigate();
  //const [user] = useAuth(auth);

  const handleCart = () => {
    navigate('/cart');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">AvaloqEcomm</a>
        <div className="mx-auto">
          {/* <Searchbar products={products} setFilteredProducts={setFilteredProducts} /> */}
        </div>
        <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
       </div>
    </nav>
  );
};

export default Navbar;
