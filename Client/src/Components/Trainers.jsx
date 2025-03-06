import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import tr1 from "../assets/t-1.png";
import tr2 from "../assets/t-2.png";
import tr3 from "../assets/t-3.png";
import tr4 from "../assets/t-4.png";
import tr5 from "../assets/t-5.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "../css/Trainercss.css";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

const Trainers = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);
  const slides = [
    <div
      className="item flex flex-col justify-center items-center w-72 p-10 text-text gap-5 bg-primary bg-opacity-10 m-10 text-center rounded-xl shadow-lg"
      key="1"
    >
      <img src={tr1} alt="" className="w-full" />
      <h1 className="text-secondary">Olivia Bennett</h1>
      <Link className="flex items-center mt-4">
        Learn More <FaArrowRight className="text-sm ml-1" />
      </Link>
    </div>,
    <div
      className="item flex flex-col justify-center items-center w-72 p-10 text-text gap-5 bg-primary bg-opacity-10 m-10 text-center rounded-xl shadow-lg"
      key="2"
    >
      <img src={tr2} alt="" className="w-full" />
      <h1 className="text-secondary">Ethan Sullivan</h1>
      <Link className="flex items-center text-blue-500 mt-4">
        Learn More <FaArrowRight className="text-sm ml-1" />
      </Link>
    </div>,
    <div
      className="item flex flex-col justify-center items-center w-72 p-10 text-text gap-5 bg-primary bg-opacity-10 m-10 text-center rounded-xl shadow-lg"
      key="3"
    >
      <img src={tr3} alt="" className="w-full" />
      <h1 className="text-secondary">Liam Anderson</h1>
      <Link className="flex items-center text-blue-500 mt-4">
        Learn More <FaArrowRight className="text-sm ml-1" />
      </Link>
    </div>,
    <div
      className="item flex flex-col justify-center items-center w-72 p-10 text-text gap-5 bg-primary bg-opacity-10 m-10 text-center rounded-xl shadow-lg"
      key="4"
    >
      <img src={tr4} alt="" className="w-full" />
      <h1 className="text-secondary">Sophia Carter</h1>
      <Link className="flex items-center text-blue-500 mt-4">
        Learn More <FaArrowRight className="text-sm ml-1" />
      </Link>
    </div>,
    <div
      className="item flex flex-col justify-center items-center w-72 p-10 text-text gap-5 bg-primary bg-opacity-10 m-10 text-center rounded-xl shadow-lg"
      key="5"
    >
      <img src={tr5} alt="" className="w-full" />
      <h1 className="text-secondary">Noah Mitchell</h1>
      <Link className="flex items-center text-blue-500 mt-4">
        Learn More <FaArrowRight className="text-sm ml-1" />
      </Link>
    </div>,
  ];
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <div
      className="embla flex flex-col justify-center text-center"
      id="trainers"
    >
      <div className="flex justify-around items-center">
        <h1 className="text-3xl font-semibold text-accent">Trainer</h1>
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
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{slide}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
