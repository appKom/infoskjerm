import { useState } from "react";
import { formatSlackDate } from "../../lib/date";
import { MemeType } from "../../lib/types";
import { BaseCard } from "./BaseCard";
import { SlackReaction } from "../SlackReaction";

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

  // TEMPORARY REACTIONS
  const reactions = [
    {
      count: 69,
      url: 'https://emojiisland.com/cdn/shop/products/Flushed_Emoji_Icon_5e6ce936-4add-472b-96ba-9082998adcf7_large.png?v=1571606089'
    },
    {
      count: 3,
      url: 'https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093'
    },
    {
      count: 12,
      url: 'https://ps.w.org/emoji-toolbar/assets/icon-256x256.png?rev=2580091'
    }
  ]

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
      {reactions.length > 0 && (
        <div className="flex gap-2 p-2 border-t border-gray-200 dark:border-gray-700">
          {reactions.map((reaction, index) => (
            <SlackReaction
              key={index}
              url={reaction.url}
              count={reaction.count}
            />
          ))}
        </div>
      )}
    </BaseCard>
  );
};
