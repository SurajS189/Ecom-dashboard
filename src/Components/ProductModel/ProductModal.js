import React, { useState } from "react";
import Thumbnail from "../Thumbnail/Thumbnail";
import RatingStars from "../RatingStars/RatingStars";
import Placeholder from "../../assets/placeholder.png";
import Styles from "./ProductModal.module.css";

const ProductModal = ({ product, onClose }) => {
  const [presentImage, setpresentImage] = useState(product.images[0]);

  const setSelectedImage = (image) => {
    setpresentImage(image)
  }

  const handleError = () => {
    setpresentImage(Placeholder);
  }

  if (!product) return null;// if product is not present then return null

  return (
    <div className={Styles.modal}>
      <div className={Styles.modalContent}>
        <button className={Styles.closeButton} onClick={onClose}>&times;</button>
        <div className={Styles.modalBody}>
          <div className={Styles.imageContainer}>
            <img
              className={Styles.productImage}
              src={presentImage}
              alt={product?.title || "Product"}
              onError={handleError}
              lazy="loading"
            />
          </div>
          <Thumbnail product={product} setSelectedImage={setSelectedImage} />
          <div className={Styles.productDetails}>
            <h2 className={Styles.productTitle}>{product?.title}</h2>
            <p className={Styles.productDescription}>{product?.description}</p>
            <p className={Styles.productCategory}> <strong>Brand:</strong>{product?.brand}</p>
            <RatingStars rating={product?.rating|| 0} />
            <p className={Styles.productPrice}>
              <strong>Price:</strong> ${product?.price}
            </p>
            <p className={Styles.productCategory}>
              <strong>Category:</strong> {product?.category}
            </p>
            <div className={Styles.buttonContainer}>
              <button className={Styles.addToCartButton}>Add to Cart</button>
              <button className={Styles.closeModalButton} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;