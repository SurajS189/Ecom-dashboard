import React, { use, useEffect, useState } from "react";
import { fetchProducts } from "../../utils/api.js";
import ProductCard from "../ProductCard/ProductCard.js";
import ProductModal from "../ProductModel/ProductModal.js";
import FilterComponent from "../Filter/Filter.js";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [modalProduct, setModalProduct] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [filters, setFilters] = useState({ categories: [], priceRange: 50000 });
  const [hasMore, setHasMore] = useState(true); // For no more products message

  // Apply filters to the products
  const applyFilters = (products, filters) => {
    // Apply filters
    let filteredProducts = products;

    if (filters.categories.length || filters.priceRange !== 50000) {
      filteredProducts = products.filter((product) => {
        const categoryMatch =
          !filters.categories.length || filters.categories.includes(product.category);
        const priceMatch = product.price <= filters.priceRange;
        return categoryMatch && priceMatch;//returing the category and price match
      });
    }
    //filter for sorting
    if (filters.sortPrice === 'lowToHigh') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortPrice === 'highToLow') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };


  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const resetFilters = () => {
    setFilters({ categories: [], priceRange: 500 });
  };

  useEffect(() => {
    const filtered = applyFilters(products, filters);
    setFilteredProducts(filtered);
  }, [products, filters]);

  // Fetch products with pagination
  const loadMoreProducts = async () => {
    if (loading || !hasMore) return; // Prevent duplicate calls
    setLoading(true);
    try {
      const newProducts = await fetchProducts( limit,skip);
      if (newProducts?.products?.length === 0) {
        setHasMore(false); // No more products available
      } else {
        setProducts((prev) => [...prev, ...newProducts.products]);
        setSkip((prev) => prev + 10);
      }
    } catch (error) {
      console.error("Failed to load products", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    loadMoreProducts()
  }, [])

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      loadMoreProducts();
    }
  };

  useEffect(() => {
    // Attach scroll listener to window
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]); // Dependencies ensure the scroll handler has updated logic

  const handleModal = (product) => {
    setModalProduct(product);
    setOpen(true);
  };

  return (
    <div className={styles.productListContainer}>
      {isOpen && <ProductModal product={modalProduct} onClose={() => setOpen(false)} />}
      <div className={styles.header}>
        <h1>E-commerce Dashboard</h1>
        <FilterComponent
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
        />
      </div>

      <div className={styles.productList}>
        {filteredProducts && filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} handleModal={handleModal} />
        ))}
      </div>
      {loading && <div className={styles.loading}> Loading...</div>}
      {!hasMore && <div className={styles.noMoreProducts}>No more products left</div>}
    </div>
  );
};

export default ProductList;
