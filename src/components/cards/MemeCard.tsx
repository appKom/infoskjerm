import { useState } from "react";
import { formatSlackDate } from "../../lib/date";
import { MemeType } from "../../lib/types";
import { BaseCard } from "./BaseCard";

const WIDTH = 600;
const MAX_RETRIES = 10;

export const MemeCard = ({ meme }: { meme: MemeType }) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleImageError = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(retryCount + 1);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  return (
    <BaseCard>
      <div className="flex items-center w-full gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <img
          className="w-12 h-12 rounded-full"
          src={meme.author_image}
          alt={meme.author}
        />
        <div className="font-medium dark:text-white">
          <div>{meme.author}</div>
          <div className="text-gray-500 dark:text-gray-400">
            {formatSlackDate(meme.date)}
          </div>
        </div>
      </div>
      {imageError ? (
        <div
          className="flex items-center justify-center py-12 bg-white dark:text-white dark:bg-gray-800"
          style={{ width: `${WIDTH}px` }}
        >
          Oops, her skjedde det en feil :(
        </div>
      ) : (
        <img
          className="bg-white dark:bg-gray-800 dark:text-white"
          src={`${meme.url}?retry=${retryCount}`}
          alt={`Meme ${meme.url}`}
          style={{ width: `${WIDTH}px` }}
          onError={handleImageError}
        />
      )}
    </BaseCard>
  );
};
