import axios from "axios";
import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const filterCategory = (cartItem) => {
    setActiveFilter(cartItem);
    const result = products.filter((cat) => {
      return cat.category === cartItem;
    });
    setFilteredProducts(result);
    console.log("filter", result);
  };

  const getProducts = async () => {
    setActiveFilter(null);
    try {
      const apiData = await axios.get("https://dummyjson.com/products");
      const fetchedProducts = apiData.data.products;
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Searchbar
        products={products}
        setFilteredProducts={setFilteredProducts}
      />
      <div>
        <button
          type="button"
          className={`btn btn-primary m-3 ${
            activeFilter === "beauty" ? "active-filter" : ""
          }`}
          onClick={() => filterCategory("beauty")}
          disabled={activeFilter !== null && activeFilter !== "beauty"}
        >
          Beauty
        </button>
        <button
          type="button"
          className={`btn btn-primary m-3 ${
            activeFilter === "fragrances" ? "active-filter" : ""
          }`}
          onClick={() => filterCategory("fragrances")}
          disabled={activeFilter !== null && activeFilter !== "fragrances"}
        >
          Fragrances
        </button>
        <button
          type="button"
          className={`btn btn-primary m-3 ${
            activeFilter === "groceries" ? "active-filter" : ""
          }`}
          onClick={() => filterCategory("groceries")}
          disabled={activeFilter !== null && activeFilter !== "groceries"}
        >
          Groceries
        </button>
        <button
          type="button"
          className={`btn btn-primary m-3 ${
            activeFilter === "furniture" ? "active-filter" : ""
          }`}
          onClick={() => filterCategory("furniture")}
          disabled={activeFilter !== null && activeFilter !== "furniture"}
        >
          Furniture
        </button>
        <button
          type="button"
          className="btn btn-danger m-3"
          onClick={getProducts}
        >
          Cancel Filter
        </button>
      </div>
      <div className="container mt-5">
        <div className="row">
          {filteredProducts.length === 0 ? <h1>Record not found</h1> : filteredProducts.map((data) => (
            <div key={data.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <img
                  className="card-img-top img-fluid"
                  src={data.images[0]}
                  alt={data.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text">${data.price}</p>
                  <button className="btn btn-primary mt-auto">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
