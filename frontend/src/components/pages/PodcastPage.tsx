import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const PodcastPage = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 26 * 60 + 23; // Total duration in seconds (26:23)

  useEffect(() => {
    // Set an interval to increment the time every second
    const interval = setInterval(() => {
      setCurrentTime(prevTime => {
        if (prevTime < totalDuration) {
          return prevTime + 1;
        } else {
          clearInterval(interval); // Stop the interval once the podcast is over
          return prevTime;
        }
      });
    }, 1000); // 1 second interval

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Calculate the progress as a percentage of the total duration
  const progressWidth = (currentTime / totalDuration) * 100;

  return (
    <div className="relative flex justify-center gap-24 items-center h-full">
      <div className="absolute inset-0 bg-gradient-to-bl dark:from-[#111827] dark:to-spotify-green/30 from-white via-white via-60% to-spotify-green/40 animate-gradient-x" />

      {/* Spotify player */}
      <div className="bg-[#212121]/80 backdrop-blur-m w-[500px] p-8 rounded-3xl shadow-2xl h-min z-10">
        <img className="rounded-2xl" src="/podcast/nach på kontoret 2.png" alt="Nach på kontoret" />
        <div className="font-bold text-4xl mt-4 text-white">
          Nach på Kontoret
        </div>
        <div className="text-xl mt-3 text-gray-400">
          Drømmer du om å alltid være med på nach? Følg Markus mens han tar deg med gjennom alt den lille hjernen hans klarer å tenke på.
        </div>

        {/* Bar */}
        <div className="h-1 bg-gray-500 dark:bg-gray-600 rounded relative mt-6">
          {/* Already listened part */}
          <div
            className="h-full bg-white rounded-l-full absolute top-0 left-0"
            style={{ width: `${progressWidth + 1}%` }}
          />
          {/* Moving Circle */}
          <div
            className="h-2 w-2 bg-white rounded-full absolute top-[-2px]"
            style={{ left: `${progressWidth}%` }}
          />
        </div>

        <div className="flex justify-between text-gray-200 mt-3">
          <div>{formatTime(currentTime)}</div>
          <div>{formatTime(totalDuration)}</div>
        </div>

        <div className="flex justify-between items-center gap-8 text-white mt-2">
          {/* 1x */}
          <svg
            viewBox="0 0 16 16"
            className="h-8 fill-current"
          >
            <path d="m12.54 10.383 1.97-1.97-1.061-1.06-1.97 1.969-1.97-1.97-1.06 1.06 1.97 1.97-1.97 1.97 1.06 1.06 1.97-1.969 1.97 1.97 1.06-1.06-1.97-1.97ZM1.842 5.1V4.06c.907-.053 1.584-.24 2.032-.56.459-.32.747-.773.864-1.36h1.248V13.5H4.482V5.1h-2.64Z"/>
          </svg>
          {/* 15s back */}
          <svg
            viewBox="0 0 16 16"
            className="h-10 fill-current"
          >
            <path d="M2.464 4.5h1.473a.75.75 0 0 1 0 1.5H0V2.063a.75.75 0 0 1 1.5 0v1.27a8.25 8.25 0 1 1 10.539 12.554.75.75 0 0 1-.828-1.25A6.75 6.75 0 1 0 2.464 4.5Z"/>
            <path d="M0 10.347V9.291c.697-.051 1.199-.18 1.507-.385.315-.205.51-.51.583-.913h1.32v7.81H1.903v-5.456H0Zm7.322 5.643c-.543 0-1.03-.099-1.463-.297a2.46 2.46 0 0 1-1.023-.869c-.25-.389-.382-.85-.396-1.386h1.518c.007.242.066.455.176.638.11.183.26.326.45.43.191.102.411.153.66.153.257 0 .48-.059.672-.176.198-.117.348-.282.45-.495.11-.213.166-.454.166-.726 0-.271-.055-.51-.165-.715a1.135 1.135 0 0 0-.451-.495 1.254 1.254 0 0 0-.671-.176c-.286 0-.536.07-.748.21a1.23 1.23 0 0 0-.462.516H4.56L5 7.993h4.642V9.39H6.207l-.211 2.134c.057-.108.136-.214.237-.319a1.77 1.77 0 0 1 .616-.407c.249-.103.52-.154.814-.154.454 0 .861.103 1.22.308.367.206.653.499.859.88.205.381.308.825.308 1.331 0 .528-.11 1.008-.33 1.441-.22.426-.54.763-.957 1.012-.411.25-.891.374-1.441.374Z"/>
          </svg>
          {/* Pause */}
          <svg
            className="h-20 fill-current"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>
          </svg>
          {/* 15s forward */}
          <svg
            viewBox="0 0 16 16"
            className="h-10 fill-current"
          >
            <path d="M13.536 4.488h-1.473a.75.75 0 1 0 0 1.5H16V2.051a.75.75 0 0 0-1.5 0v1.27A8.25 8.25 0 1 0 3.962 15.876a.75.75 0 0 0 .826-1.252 6.75 6.75 0 1 1 8.747-10.136Z"/>
            <path d="M11.81 15.681c.433.198.921.297 1.464.297.55 0 1.03-.124 1.44-.374.419-.25.738-.586.958-1.012.22-.432.33-.913.33-1.44 0-.507-.103-.95-.308-1.332a2.156 2.156 0 0 0-.858-.88 2.416 2.416 0 0 0-1.221-.308c-.294 0-.565.052-.814.154a1.77 1.77 0 0 0-.616.407c-.1.105-.18.211-.237.319l.211-2.134h3.436V7.981h-4.642l-.44 4.61h1.474a1.24 1.24 0 0 1 .462-.518c.212-.14.462-.209.748-.209.256 0 .48.059.67.176.199.118.349.283.452.495.11.206.165.444.165.715 0 .272-.055.514-.165.726a1.135 1.135 0 0 1-.451.495 1.25 1.25 0 0 1-.671.176c-.25 0-.47-.051-.66-.154a1.155 1.155 0 0 1-.451-.429 1.295 1.295 0 0 1-.176-.638h-1.518c.014.536.146.998.396 1.386a2.46 2.46 0 0 0 1.023.87Zm-5.858-5.346V9.28c.697-.051 1.199-.18 1.507-.385.315-.205.51-.51.583-.913h1.32v7.81H7.855v-5.456H5.952Z"/>
          </svg>
          {/* Timer */}
          <svg
            viewBox="0 0 448 512"
            className="h-8 fill-current"
          >
            <path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l16 0 0 34.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6L256 64l16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L224 0 176 0zm72 192l0 128c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-128c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
            </svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl z-10 flex flex-col items-center"
      >
        <h1 className="text-6xl font-bold mb-6 leading-tight dark:text-white text-online-blue text-left w-full">
          Onlines offisielle <span className="text-spotify-green/80">podcast</span>
        </h1>
        <div className="text-xl mb-24 dark:text-white gap-2 flex flex-col w-full relative">
          <p><span className="font-semibold">&quot;Nach på kontoret&quot;</span> er den ideelle følgesvennen når du gjør deg klar til vors, gjerne sammen med en kald pils eller to etter dusjen.</p>
            <p>Har du spørsmål eller tips til neste episode? Send dem inn på <span className="font-bold bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
              Instagram
            </span>
          !</p>
          <div className="absolute right-[130px] top-[100px]">
            <div className="bg-gray-700 px-2 py-1 text-xl rounded-lg relative text-white font-medium w-max">
              <div className="relative z-10 flex items-center gap-1">
                <img className="w-6" src="/podcast/ig-logo.svg" />
                <div className="p-1">online_nachpakontoret</div>
                </div>
              <div className="bg-gray-700 h-5 w-5 absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 z-0" />
            </div>
          </div>
        </div>

        {/* QR code */}
        <div className="mt-8 flex bg-[#212121]/80 shadow-2xl rounded-3xl p-6">
          <img
            className="w-[350px] aspect-square"
            src="/podcast/qr-code.svg"
          />
        </div>
      </motion.div>
    </div>
  );
}

// Helper function to format time (e.g., 2:02, 12:15)
const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
};