'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const handleSearch = async (query = '') => {
    try {
      setLoading(true);
      
      const { data } = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Products</h1>
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={() => handleSearch(searchQuery)}
          loading={loading}
        />

        <SearchResults 
          products={products}
          loading={loading}
          searchQuery={searchQuery}
          onClearSearch={() => {
            setSearchQuery('');
            handleSearch('');
          }}
        />
      </div>
      <hr />
      <Footer/>
    </>
  );
};

export default SearchPage;