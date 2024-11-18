import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import { useDarkMode } from "../utils/DarkModeProvider";
import clsx from 'clsx';
import { SnowPile } from "../SnowPile";

const folksomergladijulEmoji = "https://emoji.slack-edge.com/T03S8TX18/folksomergladijul/d7da5ca5a6ac293b.png";

const julebordDate = new Date(2024, 10, 13); // 13. november

const calculateDaysUntilChristmas = () => {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 24); // December 24th
  if (today > christmas) {
    // If today is after this year's Christmas, calculate for next year's Christmas
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  const diffTime = Math.abs(christmas.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatJulebordDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('no-NO', options);
};

export const ChristmasPage = () => {
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(calculateDaysUntilChristmas());
  const { isDarkMode } = useDarkMode();

  const isAfterJulebord = new Date() > julebordDate;

  // Snowflake count ranges from 150 to 750 based on the days until Christmas
  const minSnowflakes = 250;
  const maxSnowflakes = 2500;
  const snowflakeCount = minSnowflakes + Math.max(0, (25 - daysUntilChristmas) * ((maxSnowflakes - minSnowflakes) / 25));

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysUntilChristmas(calculateDaysUntilChristmas());
    }, 60000); // Recalculate every 1 minute

    return () => clearInterval(interval);
  }, []);

  // Accumulate snow on top of infographic
  const MIN_SNOW_HEIGHT = 2.5
  const MAX_SNOW_HEIGHT = 15
  const snowHeight = MIN_SNOW_HEIGHT + Math.max(0, (55 - daysUntilChristmas) * ((MAX_SNOW_HEIGHT - MIN_SNOW_HEIGHT) / 55));

  return (
    <div className="relative flex items-center justify-center h-full bg-gradient-to-b from-[#9acdf5] to-[#d1e3f1] dark:bg-none">
      <div className='z-30'>
        <Snowfall color={isDarkMode ? "#def1ff" : "#fff"} snowflakeCount={snowflakeCount} />
      </div>

      <div className="w-full max-w-2xl relative">
        <SnowPile height={snowHeight / 2} className="absolute bottom-[calc(100%-20px)] w-full z-40" />
        <div className="relative z-50 p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Nedtelling til jul</h1>

          <div className={clsx(
            "text-center",
            isAfterJulebord ? "my-32" : "mb-12"
            )}>
            <p className="font-extrabold text-red-600 dark:text-500 text-[138px] leading-none" >
              {daysUntilChristmas}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300">{daysUntilChristmas === 1 ? "dag" : "dager"} igjen!</p>
          </div>

          {!isAfterJulebord && (
            <div className="py-8 mb-8 border-y border-gray-200 dark:border-gray-700 relative">
              <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">Nominer Årets Nisse</h2>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-400">Skann QR-koden og send inn din nominasjon før julebordet <b>{formatJulebordDate(julebordDate)}</b>!</p>
              <div className="flex justify-center">
                <img
                  className="w-64"
                  src={isDarkMode ? "/qr-codes/nisse-white.svg" : "/qr-codes/nisse-green.svg"}
                  alt="Årets Nisse QR Kode"
                />
              </div>

              <div className="absolute -right-[50px] bottom-[100px]">
                <div className="relative w-[150px] flex flex-col items-center rotate-12">
                  {/* Image */}
                  <img
                    className="rounded-full border-4 w-full"
                    src="/jul/fredrik.png"
                    alt=""
                  />

                  {/* Badge */}
                  <span
                    className="absolute -bottom-4 bg-green-100 gap-1.5 text-green-800 font-medium flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border-2 border-green-400"
                  >
                    <div className="w-max text-center">
                      Godkjent av Fredda Jul
                    </div>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">Presentert av interessegruppen <span className="font-bold">folk som er glad i jul</span>!</p>

          {['top-4 left-4', 'top-4 right-4', 'bottom-4 right-4', 'bottom-4 left-4'].map((pos) => (
            <img
              key={pos}
              src={folksomergladijulEmoji}
              className={clsx("absolute max-h-14", pos)}
            />
          ))}
        </div>
      </div>

      {/* Background hill */}
      <img className="w-full absolute -bottom-10 opacity-95 z-10" src="/christmas/hill.svg" alt="" />

      {/* Mountains */}
      <img className="absolute bottom-0" src="/christmas/mountains.svg" alt="" />
  </div>
  );
};
