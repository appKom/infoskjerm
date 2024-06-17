import { formatSlackDate } from "../../lib/date";
import { MemeType } from "../../lib/types";
import { BaseCard } from "./BaseCard";

const WIDTH = 500;

export const MemeCard = ({ meme }: { meme: MemeType }) => {
  return (
    <BaseCard>
      <div className="flex items-center w-full gap-4 px-4 py-3">
        <img
          className="w-10 h-10 rounded-full"
          src={meme.author_image}
          alt={meme.author}
          />
        <div className="font-medium dark:text-white">
          <div>{meme.author}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {formatSlackDate(meme.date)}
          </div>
        </div>
      </div>
      <img
        className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        src={meme.url}
        alt={`Meme ${meme.url}`}
        style={{ width: `${WIDTH}px` }}
      />
    </BaseCard>
  )
}