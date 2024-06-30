import React, { useState } from 'react';


const SearchBar = ({products,setFilteredProducts}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    // <div className="search-bar rounded-3 pb-5">
    //   <input
    //     type="text"
    //     placeholder="Search products..."
    //     value={searchTerm}
    //     onChange={handleSearch}
    //   />
    // </div>
     <div class="row no-gutters mt-3  align-items-center">
    
         <input class="form-control border-secondary rounded-pill pr-5" type="search"  value={searchTerm}
         onChange={handleSearch}id="example-search-input2"/>
          
     <div class="col-auto">
         <button class="btn btn-outline-light text-dark border-0 rounded-pill ml-n5" type="button">
             {/* <i class="fa fa-search"></i> */}
             {/* <span class="glyphicon glyphicon-search"></span> */}
          

         </button>
     </div>
 </div>
    
    
  );
};

export default SearchBar;
