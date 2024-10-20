import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MAX_STAR_SIZE = 8
const MIN_STAR_SIZE = 1;

const MAX_ANIMATION_DURATION = 10;
const MIN_ANIMATION_DURATION = 2;

export const StarSky = ({ starCount }: { starCount: number }) => {
  const [stars, setStars] = useState<IStar[]>([]);

  useEffect(() => {
    const initialStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE) + MIN_STAR_SIZE,
      animationDuration: Math.random() * (MAX_ANIMATION_DURATION - MIN_ANIMATION_DURATION) + MIN_ANIMATION_DURATION,
    }));
    setStars(initialStars);
  }, [starCount]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="w-full h-full bg-gradient-to-t from-[#111] from-60% to-[#150d13]">
        {/* Twinkling stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: 'white',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: star.animationDuration,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}

        {/* Fog */}
        <div className="absolute z-10 w-full h-full bg-gradient-to-t from-[#0b1f3f] from-20%" />

        {/* Forest */}
        <img
          src="/graphics/forest.svg"
          className="absolute w-full bottom-0 z-20"
        />

        {/* Moon */}
        <svg
          className="w-80 absolute top-80 left-32"
          viewBox="0 0 24 24"
        >
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#ffe18f"/>
        </svg>
      </div>
    </div>
  );
};

interface IStar {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
}