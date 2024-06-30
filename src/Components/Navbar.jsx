import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleCart = () => {
    navigate('/cart');
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">AvaloqEcomm</a>
        <div className="mx-auto">
          {/* <Searchbar products={products} setFilteredProducts={setFilteredProducts} /> */}
        </div>
        <button className="btn btn-outline-light" onClick={handleCart}>Go to Cart</button>
      </div>
    </nav>
  );
};

export default Navbar;
