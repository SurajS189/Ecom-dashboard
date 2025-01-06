import React, { useState } from "react";
import Styles from "./Filter.module.css";

const FilterComponent = ({ filters, onFilterChange, onResetFilters }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categoryMap = {
    "ELECTRONICS": "Electronics",
    "CLOTHING": "Clothes",
    "JEWELERY": "jewelery",
    "FURNITURE": "Furniture",
    "MISCELLANEOUS": "Miscellaneous",
    "SHOES": "Shoes",
  };

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
              {Object.entries(categoryMap)?.map(([key, value]) => (
                <label key={value} className={Styles.categoryItem}>
                  <input
                    type="checkbox"
                    value={value}
                    checked={filters.categories.includes(value)}
                    onChange={() => handleCategoryChange(value)}
                  />
                  {key}
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
              max="500"
              step="10"
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
