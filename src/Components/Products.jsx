import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import Searchbar from './Searchbar'; // Adjust the path according to your actual file structure
//import { CartContext } from './CartContext'; // Adjust the path according to your actual file structure

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {

    try {
      const apiData = await axios.get('https://dummyjson.com/products');
      const fetchedProducts = apiData.data.products;
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts); // Initialize filtered products with all products
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Searchbar products={products} setFilteredProducts={setFilteredProducts} />

      <div className="container mt-5">
  <div className="row">
    {filteredProducts.map((data) => (
      <div key={data.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div className="card h-100">
          <img className="card-img-top img-fluid" src={data.images[0]} alt={data.title} style={{ height: '200px', objectFit: 'cover' }} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">${data.price}</p>
            <button className="btn btn-primary mt-auto">Add to cart</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
};
//export const products = products;
export default Products;
