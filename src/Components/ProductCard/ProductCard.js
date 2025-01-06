import React,{useState} from "react";
import Thumbnail from "../Thumbnail/Thumbnail";
import Placeholder from "../../assets/placeholder.png";
import LazyLoad from "react-lazyload";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, handleModal }) => {
  const [presentImage, setPresentImage] = useState(product?.images[0]);

  const handleOpen = () => {
    handleModal(product);
  };

  const setSelectedImage = (image) => {
    setPresentImage(image);
  };

  const handleImageError = () => {//error handling for image
    setPresentImage(Placeholder);
  };

  return (
    <div className={styles.productCard} onClick={handleOpen}>
      <LazyLoad height={300} offset={100} placeholder={<img src={Placeholder} alt="Placeholder" />}>
        <img
          className={styles.productImage}
          src={presentImage}
          alt={product?.title}
          onError={handleImageError}
        />
      </LazyLoad>
      <Thumbnail product={product} setSelectedImage={setSelectedImage} />
      <h3 className={styles.productTitle}>{product?.title}</h3>
      <div className={styles.productDetails}>
        <p>Price: ${product?.price}</p>
        <p>Category: {product?.category?.name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
