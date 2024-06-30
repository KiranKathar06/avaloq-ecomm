import React, { useState } from "react";

const SearchBar = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div class="relative flex items-center mt-3">
      <input
        class="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="search"
        value={searchTerm}
        placeholder="Search the product"
        onChange={handleSearch}
        id="example-search-input2"
        style={{
          backgroundImage: `url(${require("../assets/searchIcon.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1.5rem",
        }}
      />
    </div>
  );
};

export default SearchBar;
