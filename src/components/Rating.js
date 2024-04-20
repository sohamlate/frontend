import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import {motion} from "framer-motion";
function RatingAndReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
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
    setReview("");
  };

  return (
    <div  className="flex flex-col space-y-[1rem] p-4 bg-sky-50 rounded-xl my-2">
      <h2 className="text-2xl font-bold bg-amber-700 text-white rounded-xl px-1 w-fit">
        Rating and Review
      </h2>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <label key={index}>
              {/* Wrap radio button and star icon inside a container */}
              <div className="flex items-center">
                <input
                  className="sr-only text-black" // Hide the radio button
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => handleRatingChange(starValue)}
                  onMouseEnter={() => handleHoverRatingChange(starValue)}
                  onMouseLeave={() => handleHoverRatingChange(0)}
                />
                <FaStar
                  className="star mt-[-0.7rem] inline-block cursor-pointer"
                  color={
                    starValue <= (hoverRating || rating) ? "#ffc107" : "#000000"
                  }
                  size={25}
                />
              </div>
            </label>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <p className="text-xl ml-2">Review:</p>
          <textarea
            className="block mt-1 w-full border border-gray-300 rounded-md p-2"
            value={review}
            onChange={handleReviewChange}
          />
        </label>
        <div className="flex justify-center">
          <button type="submit" className=" button-89 ">
            Submit Review
          </button>
        </div>
      </form>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2 bg-amber-400 text-white rounded-xl px-1 w-fit">
          Reviews:
        </h3>
        {reviewsList.length === 0 ? (
          <ReactTyped
            strings={["No reviews yet."]}
            typeSpeed={40}
            backSpeed={50}
            className="font-poppins text-lg" 
          ></ReactTyped>
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
