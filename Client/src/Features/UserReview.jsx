import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Appbar from "../Layouts/Appbar";
import { toast } from "react-toastify";

const UserReview = () => {
  const [isReview, setIsReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [classDetails, setClassDetails] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get("http://localhost:3001/booking/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const bookedClasses = Array.isArray(response.data)
          ? response.data.filter((item) => item.status === "Completed")
          : response.data.status === "Completed"
          ? [response.data]
          : [];

        setClassDetails(bookedClasses);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    fetchClass();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review || rating === 0) {
      toast.error("Please provide a rating and review");
      return;
    }

    if (!selectedClassId) {
      toast.error("No class selected for review");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/booking/updatereview",
        { id: selectedClassId, reviewText: review, rating: rating },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success("Review submitted successfully!");
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
    setIsReview(false);
  };
  return (
    <div className="flex w-screen h-screen flex-col">
      <Appbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full flex">
        <Sidebar isOpen={isOpen} />
        <div className="w-full">
          {loading ? (
            <div className="">
              <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                {/* ... */}
              </svg>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="">
              <p>{error}</p>
            </div>
          ) : (
            <div className="w-full h-[88vh] flex gap-10 flex-col justify-center items-center">
              <table className="w-fit bg-secondary bg-opacity-15 rounded-2xl">
                <thead>
                  <tr>
                    <th className="p-7">class</th>
                    <th className="p-7">Date</th>
                    <th className="p-7">Trainer</th>
                    <th className="p-7">Status</th>
                    <th className="p-7">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {classDetails.map((item) => (
                    <tr key={item._id}>
                      <td className="p-7">{item.class}</td>
                      <td className="p-7">{item.slotTime.date}</td>
                      <td className="p-7">{item.trainer}</td>
                      <td className="p-7">{item.status}</td>
                      <td className="p-7">
                        <button
                          className="px-5 py-2 rounded-3xl shadow-2xl bg-primary text-background cursor-pointer"
                          onClick={() => {
                            setSelectedClassId(item._id);
                            setIsReview(true);
                          }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {isReview && (
          <div
            className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-background bg-opacity-90"
            onClick={() => setIsReview(false)}
          >
            <div
              className="w-fit h-fit p-6 shadow-lg rounded-xl bg-secondary bg-opacity-90"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-center mb-4">
                Submit Your Review
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Your Review</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="Write about your experience..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`text-2xl ${
                          rating >= num ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() => setRating(num)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white p-2 rounded-lg hover:bg-opacity-80"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReview;
