import { MemeType } from "../lib/types";

export const MemeCard = ({ meme, height }: { meme: MemeType, height: number }) => {
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
            {formatDate(meme.date)}
          </div>
        </div>
      </div>
      <img
        className="object-scale-down bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
        src={meme.url}
        alt={`Meme ${meme.url}`}
        style={{ height: `${height}px` }}
      />
    </div>
  )
}

const formatDate = (dateInput: string): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    return 'Ugyldig dato'; // Handles invalid date inputs
  }

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  // Use 24-hour time format without AM/PM in Norwegian
  const time = date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

  // Compare dates ignoring time
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return `I dag, ${time}`;
  } else if (isYesterday) {
    return `I går, ${time}`;
  } else {
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)); // Using floor to calculate full past days
    return `${diffDays} dager siden`;
  }
};