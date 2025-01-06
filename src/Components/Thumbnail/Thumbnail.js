import React from 'react';
import Placeholder from "../../assets/placeholder.png";
import styles from "./Thumbnail.module.css";

const Thumbnail = ({ product, setSelectedImage }) => {
    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleImageError = (event) => {// error handling for image
        event.target.src = Placeholder;
    };

    return (
        <div className={styles.thumbnailContainer}>
            {product && product?.images.map((image, index) => (
                <img
                    key={index}
                    className={styles.thumbnail}
                    src={image}
                    alt={`${product?.title} thumbnail ${index + 1}`}
                    onMouseEnter={() => handleThumbnailClick(image)}
                    onError={handleImageError}
                />
            ))}
        </div>
    );
};

export default Thumbnail;
