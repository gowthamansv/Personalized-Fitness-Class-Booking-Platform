import React, { useState, useEffect, useCallback } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import a1 from "../assets/a-1.png";
import a2 from "../assets/a-2.png";
import a3 from "../assets/a-3.png";
import a4 from "../assets/a-4.png";
import "../css/Aboutcss.css";

const About = () => {
  const aimages = [a1, a2, a3, a4];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
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

  return (
    <div className="flex flex-col mobile:flex-row p-10" id="about">
      <div className="w-full mobile:w-1/2 flex flex-col gap-10">
        <h1 className="font-semibold text-3xl text-accent">About Us</h1>
        <p className="">
          Gym24 is a leading fitness center located near Grushevka metro
          station, offering over 1500 sq. m of space dedicated to
          top-of-the-line workout equipment from leading brands such as Hammer
          Strength, Life Fitness, and TechnoGym.
          <br />
          <br /> With affordable membership options, Gym24 is accessible to
          everyone who wants to reach their fitness goals, whether it's building
          strength, increasing endurance, or losing weight.
          <br />
          <br /> Certified trainers at Gym24 provide expert guidance and support
          to develop personalized workout plans tailored to each individual's
          needs and goals.
        </p>
      </div>
      {/* Slider Section */}
      <div className="w-full mobile:w-1/2">
        <div className="emblab">
          <div className="embla__viewportb" ref={emblaRef}>
            <div className="embla__containerb">
              {aimages.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  alt={`Slide ${index + 1}`}
                  className="embla__slideb h-full mobile:h-[60vh] object-cover rounded-2xl m-5"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
