import React, { useEffect, useState } from "react";
import Styles from "./Filter.module.css";
import { fetchCategory } from "../../utils/categorylist";

const FilterComponent = ({ filters, onFilterChange, onResetFilters }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);


  const loadCategory = async () => { //fetching category
    try {
      const categories = await fetchCategory();
      const categoryArray = categories.map((category) => ({
        key: category.toUpperCase(),
        value: category
      }));
      setCategoryList(categoryArray) //setting the category list in array of objects
    } catch (error) {
      console.error("Error fetching Category", error);
      throw error;
    }
  };

  useEffect(() => {
    loadCategory()
  }, [])

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((cat) => cat !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, priceRange: e.target.value });
  };

  return (
    <div className={Styles.filterContainer}>
      <button className={Styles.filterButton} onClick={toggleFilters}>
        Filter
      </button>
      {isFiltersOpen && (
        <div className={Styles.filterContent}>
          <div className={Styles.filterSection}>
            <h3 className={Styles.filterTitle}>Categories:</h3>
            <div className={Styles.categoryList}>
              {categoryList && categoryList?.map((cat) => (
                <label key={cat.value} className={Styles.categoryItem}>
                  <input
                    type="checkbox"
                    value={cat.value}
                    checked={filters.categories.includes(cat.value)}
                    onChange={() => handleCategoryChange(cat.value)}
                  />
                  {cat?.key}
                </label>
              ))}
            </div>
          </div>
          <div className={Styles.filterSection}>
            <h3 className={Styles.filterTitle}>Sort By Price:</h3>
            <div className={Styles.sortOptions}>
              <label className={Styles.sortOption}>
                <input
                  type="radio"
                  name="sortPrice"
                  value="lowToHigh"
                  checked={filters.sortPrice === "lowToHigh"}
                  onChange={() => onFilterChange({ ...filters, sortPrice: "lowToHigh" })}
                />
                Low to High
              </label>
              <label className={Styles.sortOption}>
                <input
                  type="radio"
                  name="sortPrice"
                  value="highToLow"
                  checked={filters.sortPrice === "highToLow"}
                  onChange={() => onFilterChange({ ...filters, sortPrice: "highToLow" })}
                />
                High to Low
              </label>
            </div>
          </div>
          <div className={Styles.filterSection}>
            <h3 className={Styles.filterTitle}>Price Range:</h3>
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={filters.priceRange}
              onChange={handlePriceChange}
              className={Styles.slider}
            />
            <span className={Styles.priceValue}>${filters.priceRange}</span>
          </div>
          <button className={Styles.resetButton} onClick={onResetFilters}>
            Reset Filters
          </button>
          <button className={Styles.resetButton} onClick={toggleFilters}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
