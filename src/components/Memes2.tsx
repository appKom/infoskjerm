import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";
import { useEffect, useState } from "react";

const REFETCH_INTERVAL_MINUTES = 15;
const AMOUNT_OF_MEMES = 3;
const MEME_SHOW_TIME_SECONDS = 10;

export const Memes2 = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  const [currentMeme, setCurrentMeme] = useState(0);

  useEffect(() => {
    if (!data) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentMeme((currentMeme + 1) % data.length);
    }, MEME_SHOW_TIME_SECONDS * 1000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) return <div>memes loading...</div>;
  if (isError) return <div>memes error</div>;
  if (!data) return <div>No memes found.</div>;

  return (
    <div className='px-8 py-5'>
      <div className="mb-5 text-4xl font-bold dark:text-white">Siste memes</div>
      <div className="flex justify-between h-[800px]">
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <div className="flex items-center gap-4">
            <img className="w-10 h-10 rounded-full" src={data[currentMeme].author_image} alt={data[currentMeme].author} />
            <div className="font-medium dark:text-white">
              <div>{data[currentMeme].author}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(data[currentMeme].date)}</div>
            </div>
          </div>
          <img src={data[currentMeme].url} className="h-[700px] mt-4 rounded" alt={`Meme ${currentMeme}`}/*  onError={handleImageError} */ />
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-1 h-full">
          {data && data.map((meme: { url: string | undefined; }, index: number) => (
            <div key={index} className={`h-[180px] overflow-hidden bg-white border rounded shadow dark:bg-gray-800 dark:border-gray-700 w-max ${index === currentMeme ? 'border-online-blue border-4' : ''}`}>
              <img src={meme.url} className="object-contain w-auto h-full max-w-full mx-auto" alt={`Meme ${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 text-xl dark:text-white">Hentet fra slack-kanalen <span className='font-medium'>#memeogvinogklinoggrin2</span></div>
    </div>
  );
};

const formatDate = (dateInput: string): string => {
  const date = new Date(dateInput);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  // Use 24-hour time format without AM/PM
  const time = date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

  // Compare dates ignoring time
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return `Idag, ${time}`;
  } else if (isYesterday) {
    return `Igår, ${time}`;
  } else {
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return `${diffDays} dager siden`;
  }
}

