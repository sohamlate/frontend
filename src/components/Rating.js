import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function RatingAndReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewsList, setReviewsList] = useState([]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleHoverRatingChange = (newHoverRating) => {
    setHoverRating(newHoverRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = { rating, review };
    setReviewsList([...reviewsList, newReview]);
    setRating(0);
    setReview('');
  };

  return (
    <div className="flex-col space-y-[1rem] p-4 mx-[10rem]">
      <h2 className="text-2xl font-bold mb-9">Rating and Review</h2>
      <div className="flex rating">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <label key={index}>
              {/* Wrap radio button and star icon inside a container */}
              <div className="flex items-center">
                <input
                  className="sr-only" // Hide the radio button
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => handleRatingChange(starValue)}
                  onMouseEnter={() => handleHoverRatingChange(starValue)}
                  onMouseLeave={() => handleHoverRatingChange(0)}
                />
                <FaStar
                  className="star mt-[-0.7rem] inline-block cursor-pointer"
                  color={starValue <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9'}
                  size={25}
                />
              </div>
            </label>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Review:
          <textarea
            className="block mt-1 w-full border border-gray-300 rounded-md p-2"
            value={review}
            onChange={handleReviewChange}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Reviews:</h3>
        {reviewsList.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviewsList.map((review, index) => (
              <li key={index} className="mb-4">
                <div className="font-semibold">Rating: {review.rating}</div>
                <div>Review: {review.review}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RatingAndReview;
