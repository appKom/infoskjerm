import { motion } from "framer-motion";

const mockData = [
  {
    weather: "Sunny",
    icon: "☀️",
  },
  {
    weather: "Rainy",
    icon: "☁️",
  },
];

const backgroundMap = [
  {
    key: "Sunny",
    background: "bg-blue-200",
  },

  {
    key: "Rainy",
    background: "bg-blue-900",
    extraIcon: "💧",
  },
];

const randomWeather = mockData[Math.floor(Math.random() * mockData.length)];

const background = backgroundMap.find(
  (temp) => temp.key === randomWeather.weather
);

const numberOfRainDrops = 100;
const numberOfClouds = 30;

const TestPage = () => {
  return (
    <div
      className={`flex w-full flex-col min-h-screen items-center ${background?.background}`}
      style={{
        backgroundImage: "url(/online_skyline.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-row">
        {Array.from({ length: numberOfRainDrops }).map((_, index) => (
          <motion.h1
            key={index}
            initial={{ x: 0 }}
            animate={{ x: 1080 }}
            transition={{
              duration: Math.random() * 4,
              delay: Math.random() * 5,
              repeatType: "loop",
              repeat: Infinity,
            }}
            className="text-2xl"
          >
            {randomWeather.icon}
          </motion.h1>
        ))}
      </div>

      <div className="flex flex-row">
        {Array.from({ length: numberOfRainDrops }).map((_, index) => (
          <motion.h1
            key={index}
            initial={{ y: -200, x: Math.random() }}
            animate={{ y: 800 }}
            transition={{
              duration: Math.random() * 4,
              delay: Math.random() * 5,
              repeatType: "loop",
              repeat: Infinity,
            }}
            className="text-2xl"
          >
            {background?.extraIcon}
          </motion.h1>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
