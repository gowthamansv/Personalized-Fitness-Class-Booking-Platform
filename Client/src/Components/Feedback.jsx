import React, { useCallback } from "react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import f1 from "../assets/f-1.png";
import f2 from "../assets/f-2.png";
import f3 from "../assets/f-3.png";
import f4 from "../assets/f-4.png";
import fg from "../assets/f-g.png";
import "../css/Feedbackcss.css";

const Feedback = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const feedback = [
    "Great atmosphere and well-maintained equipment. The gym layout allows easy movement between machines. I love how friendly the staff is every time I walk in!",
    "Trainers are very helpful and knowledgeable. They provide great workout tips and always encourage proper form. I’ve seen great improvements in my fitness thanks to their guidance.",
    "The gym is clean, but it gets too crowded during peak hours. Sometimes, I have to wait too long for machines. It would be great if they could expand or add more equipment.",
    "Love the variety of workout classes available! The instructors bring a lot of energy, and the sessions are always fun. I wish they would introduce a few more advanced-level classes.",
    "Wish there were more free weights and squat racks. The current ones are always occupied, making it difficult to complete my routine. Maybe adding a booking system could help manage usage better.",
    "The membership price is reasonable for the quality of service. Compared to other gyms, I feel like I’m getting good value. The only downside is that personal training sessions can be a bit expensive.",
    "Locker rooms and showers are always spotless! The staff does a great job maintaining hygiene, and there’s always fresh towels available. I appreciate the attention to cleanliness and comfort.",
    "Would be great if they extended their opening hours on weekends. I prefer late-night workouts, but the gym closes too early. A 24/7 option would make it perfect for night owls like me!",
  ];
  return (
    <div className="flex flex-col gap-5 p-5 mobile:p-10">
      <div className="flex flex-col mobile:flex-row justify-around gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-accent">
            What Our Customers Say
          </h1>
          <p className="text-center">
            At This Part you can See Few Of The Many Positive reviews Of Our
            Customers.
          </p>
        </div>
        <button className="rounded-xl px-4 h-fit py-3 shadow-xl bg-primary bg-opacity-10">
          Your opinion
        </button>
      </div>
      <div className="flex justify-around">
        <div className="hidden static mobile:relative mobile:grid grid-flow-row grid-cols-2 w-2/5 h-full">
          <img src={f1} alt="" className="absolute w-3/12 left-52 top-10" />
          <img src={f2} alt="" className="absolute w-2/5 top-36 left-10" />
          <img src={f3} alt="" className="absolute w-2/6" />
          <img src={f4} alt="" className="absolute w-2/6 top-40 left-64" />
        </div>
        <div className="flex flex-col p-2 mobile:p-10 w-full mobile:w-2/4 gap-5">
          <div className="emblac w-full shadow-2xl rounded-2xl bg-primary bg-opacity-10">
            <div className="embla__viewportc" ref={emblaRef}>
              <div className="embla__containerc">
                {feedback.map((list, index) => (
                  <div
                    className="flex-shrink-0 flex justify-around w-full p-12 embla__slidec"
                    key={index}
                  >
                    <p className="pl-8">{list}</p>
                  </div>
                ))}
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default Feedback;
