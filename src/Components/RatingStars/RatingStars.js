import Styles from './Rating.module.css';

const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 !== 0; // Half star check
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars
  
    return (
      <div className={Styles.ratingStars}>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <span key={`full-${index}`} className={Styles.star}>
              &#9733; {/* Full star */}
            </span>
          ))}
        {halfStar && (
          <span className={`${Styles.star} ${Styles.halfStar}`}>&#9734;</span>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <span key={`empty-${index}`} className={`${Styles.star} ${Styles.emptyStar}`}>
              &#9734; {/* Empty star */}
            </span>
          ))}
      </div>
    );
  };

export default RatingStars;