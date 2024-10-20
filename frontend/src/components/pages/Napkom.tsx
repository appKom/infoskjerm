import { useState, useEffect } from "react";
import { MinecraftChat } from "../MinecraftChat";

const AMOUNT_OF_STARS = 150;

export const NapkomPage = () => (
  <div className="h-full flex justify-around items-center relative overflow-hidden">
    <StarSky starCount={AMOUNT_OF_STARS} />
    <MinecraftChat />
    
    <img src="/napkom/jon-blund.png" alt="Jon Blund" className=" absolute top-0 right-10 w-64 animate-swing" />
    <div className="relative flex flex-col items-center w-full max-w-4xl aspect-video z-20 p-12 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Sov godt i natt!</h1>
      <img src="/napkom/JonBlund.png" alt="Jon Blund" className="w-4/5" />
      <p className="text-center mt-12 text-gray-500 font-minecraft dark:text-gray-400 ">Denne meldingen er presentert av <b>NapKom</b> i samarbeid med <b>Jon Blund</b>!</p>

      {['top-6 left-6', 'top-6 right-6', 'bottom-6 right-6', 'bottom-6 left-6'].map((pos) => (
        <img
          key={pos}
          src="/napkom/NapKom.svg"
          className={`absolute max-h-16 ${pos}`}
        />
      ))}

    </div>
  </div >
);

const MAX_STAR_SIZE = 12;
const MIN_STAR_SIZE = 1;

const MAX_ANIMATION_DURATION = 5;
const MIN_ANIMATION_DURATION = 1;

const StarSky = ({ starCount }: { starCount: number }) => {
  const [stars, setStars] = useState<IStar[]>([]);

  useEffect(() => {
    const newStars = Array(starCount).fill(0).map(() => {
      const size = Math.random() * MAX_STAR_SIZE + MIN_STAR_SIZE;
      const animationDuration = Math.random() * MAX_ANIMATION_DURATION + MIN_ANIMATION_DURATION;
      return {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        size: `${size}px`,
        animationDuration: `${animationDuration}s`,
      };
    });
    setStars(newStars);
  }, [starCount]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="w-full h-full bg-gradient-to-t from-[#111] from-60% to-[#150d13]">
        {stars.map((star: IStar, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6)',
              animation: `pulse ${star.animationDuration} ease-in-out infinite`,
            }}
          />
        ))}
        <div className="absolute z-10 w-full h-full bg-gradient-to-t from-[#0b1f3f] from-20%" />
        <img
          src="/graphics/forest.svg"
          className="absolute w-full bottom-0 z-20"
        />
        <svg
          className="w-72 absolute top-80 left-16"
          viewBox="0 0 24 24"
        >
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#ffe18f"/>
        </svg>
      </div>
    </div>
  );
}

interface IStar {
  left: string;
  top: string;
  size: string;
  animationDuration: string;
}