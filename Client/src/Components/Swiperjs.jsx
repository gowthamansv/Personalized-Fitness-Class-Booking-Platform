import React, { useState } from "react";
import img1 from "../assets/s-1.jpg";
import img2 from "../assets/s-2.jpg";
import img3 from "../assets/s-3.jpg";
import img4 from "../assets/s-4.jpg";

const Swiperjs = () => {
  // Images array
  const images = [img1, img2, img3, img4];

  const [currentIndex, setCurrentIndex] = useState(0); // Current slide index

  // Move to the previous slide
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Move to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Slider Container */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-1000"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover"
            />
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="transform -translate-y-1/2 bg-gray-800 text-black p-2 rounded-full shadow hover:bg-gray-600"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="transform -translate-y-1/2 bg-gray-800 text-black p-2 rounded-full shadow hover:bg-gray-600"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex
                ? "bg-gray-800"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Swiperjs;
