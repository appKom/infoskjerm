import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import { useDarkMode } from "../utils/DarkModeProvider";

const slackEmojies = {
  'julebrus': "https://emoji.slack-edge.com/T03S8TX18/julebrus/0d5529e3ff9e4957.png",
  'folksomergladijul': "https://emoji.slack-edge.com/T03S8TX18/folksomergladijul/d7da5ca5a6ac293b.png",
  'christmaslesbianbarista': "https://emoji.slack-edge.com/T03S8TX18/christmaslesbianbarista/b396503c0688fb07.png",
  'christmas_parrot': "https://emoji.slack-edge.com/T03S8TX18/christmas_parrot/49c1a209126c1f35.gif",
}

const calculateDaysUntilChristmas = () => {
  const today = new Date()
  const christmas = new Date(today.getFullYear(), 11, 24); // December 24th
  if (today > christmas) {
    // If today is after this year's Christmas, calculate for next year's Christmas
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  const diffTime = Math.abs(christmas.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const ChristmasPage = () => {
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(calculateDaysUntilChristmas());
  const { isDarkMode } = useDarkMode();

  // Snowflake count ranges from 150 to 750 based on the days until Christmas
  const minSnowflakes = 150;
  const maxSnowflakes = 750;
  const snowflakeCount = minSnowflakes + Math.max(0, (25 - daysUntilChristmas) * ((maxSnowflakes - minSnowflakes) / 25));

  useEffect(() => {
    const interval = setInterval(() =>
      setDaysUntilChristmas(calculateDaysUntilChristmas())
      , 60000); // Recalculate every 1 minute
    return () => clearInterval(interval);
  }, []);

  // Accumulate snow on top of infographic
  const MIN_SNOW_HEIGHT = 2.5
  const MAX_SNOW_HEIGHT = 15
  const snowHeight = MIN_SNOW_HEIGHT + Math.max(0, (55 - daysUntilChristmas) * ((MAX_SNOW_HEIGHT - MIN_SNOW_HEIGHT) / 55));

  return (
    <div className="relative flex items-center justify-center h-full bg-gradient-to-b from-[#9acdf5] to-[#d1e3f1] dark:bg-none">
      <Snowfall color={isDarkMode ? "#def1ff" : "#fff"} snowflakeCount={snowflakeCount} />

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 50 ${snowHeight}`} className="relative w-full z-10 -bottom-5">
          <defs>
            <pattern id="snow-pattern" patternUnits="userSpaceOnUse" width={500} height={30}>
              <image href="https://img.freepik.com/free-photo/translucent-texture_1160-798.jpg?t=st=1728740536~exp=1728744136~hmac=2beb5b5ac0ffd69c18c238584f9a1d0bdac2f09d556f4acab99ff1f0b54f5482&w=1380"
                x={0} y={0} width={50} />
            </pattern>
          </defs>
          <path
            fill="url(#snow-pattern)"
            d={`m 50,${snowHeight} h -50 c 0,-${snowHeight} 0,-${snowHeight} 25,-${snowHeight} 25,0 25,0 25,${snowHeight} z`}

          />
        </svg>
        <div className="relative w-full max-w-2xl p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl z-20">


          <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Nedtelling til jul</h1>

          <div className="mb-12 text-center">
            <p className="font-extrabold text-red-600 text-8xl dark:text-500">{daysUntilChristmas}</p>
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">{daysUntilChristmas === 1 ? "dag" : "dager"} igjen!</p>
          </div>

          <div className="py-8 mb-8 border-t border-b border-gray-200">
            <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">Nominer Årets Nisse</h2>
            <p className="mb-4 text-center text-gray-600 dark:text-gray-400">Skann QR-koden og send inn din nominasjon før julebordet!</p>
            <div className="flex justify-center">
              <img
                className="w-64"
                src={isDarkMode ? "/qr-codes/nisse-white.svg" : "/qr-codes/nisse-green.svg"}
                alt="Årets Nisse QR Kode"
              />
            </div>
          </div>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">Presentert av interessegruppen <span className="font-bold">folk som er glad i jul</span>!</p>

          {['top-4 left-4', 'top-4 right-4', 'bottom-4 right-4', 'bottom-4 left-4'].map((pos) => (
            <img key={pos} src={slackEmojies.folksomergladijul} className={`absolute ${pos} max-h-14`} />
          ))}
        </div>
      </div>
    </div>
  );
}