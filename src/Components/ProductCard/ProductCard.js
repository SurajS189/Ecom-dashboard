import React, { useState } from "react";
import Thumbnail from "../Thumbnail/Thumbnail";
import RatingStars from "../RatingStars/RatingStars.js";
import Placeholder from "../../assets/placeholder.png";
import LazyLoad from "react-lazyload";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, handleModal }) => {
  const [presentImage, setPresentImage] = useState(product?.images[0]);
  const [isLoading, setIsLoading] = useState(true); 

  const handleOpen = () => {
    handleModal(product);
  };

  const setSelectedImage = (image) => {
    setPresentImage(image);
    setIsLoading(true); 
  };

  const handleImageLoad = () => {
    setIsLoading(false); 
  };

  const handleImageError = () => {
    setPresentImage(Placeholder); 
    setIsLoading(false); 
  };

  return (
    <div className={styles.productCard} onClick={handleOpen}>
      <div className={styles.imageWrapper} style={{ position: "relative" }}>
        {/* Show loader/placeholder until the image loads */}
        {isLoading && (
          <div className={styles.loader}>
            {/* Replace this with your preferred loader or skeleton */}
            <img src={Placeholder} alt="Loading" className={styles.placeholderImage} />
          </div>
        )}
        <LazyLoad
          height={300}
          offset={100}
          placeholder={<img src={Placeholder} alt="Placeholder" />}
        >
          <img
            className={styles.productImage}
            src={presentImage}
            alt={product?.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={isLoading ? { visibility: "hidden" } : { visibility: "visible" }}
          />
        </LazyLoad>
      </div>
      <Thumbnail product={product} setSelectedImage={setSelectedImage} />
      <h3 className={styles.productTitle}>{product?.title}</h3>
      <div className={styles.productDetails}>
        <div className={styles.ratingContainer}>
          <RatingStars rating={product?.rating || 0} />
        </div>
        <p>Price: ${product?.price}</p>
        <p>Category: {product?.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
