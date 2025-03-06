import axios from "axios";
import React, { useEffect, useState } from "react";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get("http://localhost:3001/booking/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const userBookings = response.data; // User's booked classes

        // Calculate recommendations
        const newRecommendations = recommendClasses(userBookings);
        setRecommendations(newRecommendations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClass();
  }, []);

  // Function to generate recommendations based on the booked classes
  const recommendClasses = (bookedClasses) => {
    // Step 1: Define the list of available classes
    const availableClasses = [
      "yoga",
      "strength training",
      "cardio",
      "home workout",
      "weightlifting",
      "rehabilitation",
    ];

    // Step 2: Get the classes the user has booked
    const bookedClassNames = bookedClasses.map((booked) => booked.class);

    // Step 3: Count the occurrences of each class to determine the most attended class
    const classCounts = {};
    bookedClassNames.forEach((className) => {
      classCounts[className] = (classCounts[className] || 0) + 1;
    });

    // Step 4: Find the most attended class
    const mostAttendedClass = Object.keys(classCounts).reduce((a, b) =>
      classCounts[a] > classCounts[b] ? a : b
    );

    // Step 5: Filter out classes the user has already booked
    const remainingClasses = availableClasses.filter(
      (className) => !bookedClassNames.includes(className)
    );

    // Step 6: Return both recommendations
    return [
      { type: "Most Attended Class", class: mostAttendedClass },
      { type: "New Classes to Try", class: remainingClasses.join(", ") },
    ];
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15 flex flex-col gap-5">
      <h2 className="text-2xl text-balance text-gray-900 sm:text-xl">
        Recommendations
      </h2>
      <div>
        <h3 className="text-lg text-balance text-gray-900 sm:text-xl">
          Most Attended Class
        </h3>
        <p>
          {recommendations.length > 0 ? recommendations[0]?.class : "No data"}
        </p>
      </div>
      <div>
        <h3 className="text-lg text-balance text-gray-900 sm:text-xl">
          New Classes to Try
        </h3>
        <p>
          {recommendations.length > 0 ? recommendations[1]?.class : "No data"}
        </p>
      </div>
    </div>
  );
};

export default Recommendation;
