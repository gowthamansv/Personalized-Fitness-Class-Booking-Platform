import React, { useCallback } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import sq from "../assets/s-1.jpg";
import sw from "../assets/s-2.jpg";
import se from "../assets/s-3.jpg";
import sr from "../assets/s-4.jpg";
import "../css/servicecss.css";

const Service = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);
  const serviceList = [
    {
      id: 1,
      title: "Losing Weight",
      para: "Embark on a sustainable weight loss journey with a balanced plan that focuses on healthy eating, regular physical activity, and mindful habits.",
      src: sq,
    },
    {
      id: 2,
      title: "Building Muscle",
      para: "Build muscle effectively with a structured plan combining strength training, progressive overload, and a protein-rich diet.",
      src: sw,
    },
    {
      id: 3,
      title: "Training in Home",
      para: "Achieve your fitness goals from the comfort of home with a versatile training plan requiring minimal equipment.",
      src: se,
    },
    {
      id: 4,
      title: "Gym Plan",
      para: "Maximize your potential with a structured gym plan tailored to your goals, whether it's building muscle, losing weight, or enhancing overall fitness.",
      src: sr,
    },
  ];

  return (
    <div
      className="flex flex-col items-center gap-10 p-16 md:p-28"
      id="service"
    >
      <div className="flex flex-col gap-10 mobile:gap-0 mobile:flex-row w-full justify-evenly items-center">
        <div className="flex flex-col gap-5 items-center mobile:items-start">
          <h1 className="text-3xl font-bold text-accent">Our Programs</h1>
          <p className="text-lg text-gray-500 text-center mobile:text-left max-w-3xl">
            At this part, you can easily access all of our programs. Take a look
            and choose whichever suits you best.
          </p>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <button
            onClick={onPrevButtonClick}
            className="bg-primary bg-opacity-10 px-4 py-2 hover:bg-secondary rounded-full shadow-lg"
          >
            ❮
          </button>

          {/* Next Button */}
          <button
            onClick={onNextButtonClick}
            className="bg-primary bg-opacity-10 px-4 py-2 hover:bg-secondary rounded-full shadow-lg"
          >
            ❯
          </button>
        </div>
      </div>
      <div className="emblaa bg-primary bg-opacity-10 rounded-2xl">
        <div className="embla__viewporta" ref={emblaRef}>
          <div className="embla__containera">
            {serviceList.map((list, index) => (
              <div
                className="flex justify-around w-full p-12 embla__slidea"
                key={index}
              >
                <div className="embla__slide__numbera flex flex-col mobile:flex-row gap-5">
                  <div className="w-full mobile:w-2/4 flex flex-col justify-around gap-5">
                    <h1 className="text-xl font-semibold text-secondary">
                      {list.title}
                    </h1>
                    <p>{list.para}</p>
                    <Link className="flex items-center text-blue-500 mt-4">
                      Learn More <FaArrowRight className="text-sm ml-1" />
                    </Link>
                  </div>
                  <img
                    src={list.src}
                    alt=""
                    className="w-64 h-56 object-cover object-top rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
