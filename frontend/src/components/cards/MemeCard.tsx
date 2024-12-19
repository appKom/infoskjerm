import { useState } from "react";
import { formatSlackDate } from "../../lib/date";
import { MemeType } from "../../lib/types";
import { BaseCard } from "./BaseCard";
import { SlackReaction } from "../SlackReaction";
import { Badge } from "../Badge";

const WIDTH = 500;
const MAX_RETRIES = 10;

export const MemeCard = ({ meme }: { meme: MemeType }) => {
  const [mediaError, setMediaError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleMediaError = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(retryCount + 1);
      setMediaError(false);
    } else {
      setMediaError(true);
    }
  };

  return (
    <BaseCard>
      <div className="relative flex items-center w-full gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <img
          className="w-12 h-12 rounded-lg"
          src={meme.authorImage}
          alt={meme.author}
        />
        <div className="font-medium dark:text-white">
          <div>{meme.author}</div>
          <div className="text-gray-500 dark:text-gray-400">
            {formatSlackDate(meme.date)}
          </div>
        </div>
        <Badge
          text={"#" + meme.channelName}
          color="blue"
          className="absolute top-3 right-3"
        />
      </div>
      {mediaError ? (
        <div
          className="flex items-center justify-center py-8 bg-white dark:text-white dark:bg-gray-800"
          style={{ width: `${WIDTH}px` }}
        >
          Oops, her skjedde det en feil :(
        </div>
      ) : meme.type === "image" ? (
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span>Loading...</span>
            </div>
          )}
          <img
            className={`bg-white dark:bg-gray-800 dark:text-white ${
              isLoading ? "invisible" : "visible"
            }`}
            src={`${meme.url}?retry=${retryCount}`}
            alt={`Meme ${meme.url}`}
            style={{ width: `${WIDTH}px` }}
            onError={handleMediaError}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
          />
        </div>
      ) : meme.type === "video" ? (
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse dark:text-white">
              <span>Gjør deg klar for smuud meme...</span>
            </div>
          )}
          <video
            className="bg-white dark:bg-gray-800 dark:text-white"
            src={meme.url}
            style={{ width: `${WIDTH}px` }}
            autoPlay
            muted
            loop
            onError={handleMediaError}
            onCanPlay={() => setIsLoading(false)}
          >
            Ooops, denne nettleseren støtter ikke video :(
          </video>
        </div>
      ) : null}
      {meme.reactions.length > 0 && (
        <div
          className="flex justify-start flex-grow w-full gap-2 p-2 overflow-hidden"
          style={{ width: `${WIDTH}px` }}
        >
          {meme.reactions.map((reaction, index) => (
            <SlackReaction
              key={index}
              url={reaction.url}
              count={reaction.count}
              name={reaction.name}
            />
          ))}
        </div>
      )}
    </BaseCard>
  );
};
