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
            <div key={data.id} className="col-md-4 mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={data.images[0]} alt={data.title} />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>${data.price}</Card.Text>
                  <button className="btn btn-primary" >Add to cart</button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
//export const products = products;
export default Products;
