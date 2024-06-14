import { formatSlackDate } from "../lib/date";
import { MemeType } from "../lib/types";

export const MemeCard = ({ meme, width }: { meme: MemeType, width: number }) => {
  return (
    <div
      className="relative flex flex-col justify-center overflow-hidden bg-white border border-gray-200 shadow rounded-xl dark:bg-gray-800 dark:border-gray-700"
      key={meme.url}
    >
      <div className="flex items-center w-full gap-4 p-4">
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
        style={{ width: `${width}px` }}
      />
    </div>
  )
}