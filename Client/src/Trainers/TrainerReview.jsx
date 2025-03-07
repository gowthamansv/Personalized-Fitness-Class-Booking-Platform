import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TrainerReview = () => {
  const [review, setReview] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          "https://personalized-fitness-class-booking.onrender.com/booking/trainer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        const filteredReviews = Array.isArray(response.data)
          ? response.data.filter((item) => item.reviewStatus === true)
          : [];

        setReview(filteredReviews);
      } catch (error) {
        toast.error("error occured");
      }
    };
    fetchReview();
  }, []);
  return (
    <div className="w-fit mx-10 p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15">
      {review.map((item) => (
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl text-balance text-gray-900 sm:text-xl">
            Review
          </h1>
          <p className="text-lg">
            {item.review.reviewText} <br /> -{" "}
            <span className="text-sm text-accent">{item.user.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrainerReview;
