import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";

const REFETCH_INTERVAL_MINUTES = 15;
const AMOUNT_OF_MEMES = 5;
const SPEED = .25;
const TRAINLENGTH = 3;

export const Memes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  const memesArray = useRef([]);
  const [components, setComponents] = useState([]);
  const [divWidth, setDivWidth] = useState(0);
  const [componentOffset, setComponentOffset] = useState(0);
  const intervalRef = useRef(null);
  const divRef = useRef(null);

  const resizeObserver = useRef(new ResizeObserver(entries => {
    for (const entry of entries) {
      setDivWidth(entry.contentRect.width);
    }
  }));

  useEffect(() => {
    console.log("NOW")
  }, [])

  useEffect(() => {
    if (divRef.current) {
      resizeObserver.current.observe(divRef.current);
    }
    return () => {
      if (divRef.current) {
        resizeObserver.current.unobserve(divRef.current);
      }
    };
  }, [divRef.current]);

  const handleInterval = useCallback(() => {
    setComponentOffset((offset) => offset < -divWidth / TRAINLENGTH ? 0 : offset - SPEED);
  }, [divWidth]);

  useEffect(() => {
    if (divWidth > 0) {
      intervalRef.current = setInterval(handleInterval, 10);
      return () => clearInterval(intervalRef.current);
    }
  }, [divWidth, handleInterval]);

  useEffect(() => {
    if (data) {
      memesArray.current = [];
      for (let i = 0; i < TRAINLENGTH; i++) {
        memesArray.current.push(data);
      }
      setComponents(memesArray.current.map((e, i) => ({ id: i, element: e })));
    }
  }, [data]);

  if (isLoading) return <div className="flex items-center justify-center h-full animate-pulse">Henter de hotteste memsa på markedet...</div>;
  if (isError) return <div>memes error</div>;

  return (
    <>
      <div className="mb-5 text-4xl font-bold dark:text-white">Siste fra #memeogvinogklinoggrin2</div>
      <div
        ref={divRef}
        className='relative flex gap-10 overflow-hidden w-max'
        style={{ left: `${componentOffset}px` }}
      >
        {components.map((component, index) => (
          <div
            key={index}
            className='flex gap-10'
          >
            {component.element.map((element) => (
            <div
              className="relative flex flex-col justify-center overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={element.url}
            >
              <div className="flex items-center w-full gap-4 p-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={element.author_image}
                  alt={element.author}
                  />
                <div className="font-medium dark:text-white">
                  <div>{element.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(element.date)}
                  </div>
                </div>
              </div>
              <img
                className="object-scale-down bg-white border border-gray-200 shadow h-[700px] dark:bg-gray-800 dark:border-gray-700"
                src={element.url}
                alt={`Meme ${element.url}`}
              />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-5 text-xl dark:text-white">
        Hentet fra slacken (<span className='font-medium'>onlinentnu.slack.com</span>)
      </div>
    </>
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

/*

<div className="relative flex justify-center overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <div className="flex items-center w-full p-6 border-b-[1.5px]">
              <div className="flex items-center w-full gap-4">
                <img className="w-10 h-10 rounded-full" src={data[currentMeme].author_image} alt={data[currentMeme].author} />
                <div className="font-medium dark:text-white">
                  <div>{data[currentMeme].author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(data[currentMeme].date)}</div>
                </div>
              </div>
              <CircularProgressbar
                className="h-10"
                value={timeLeft}
                maxValue={MEME_SHOW_TIME_SECONDS}
                strokeWidth={50}
                styles={buildStyles({
                  pathColor: '#0B5374',
                  trailColor: '#fff',
                  strokeLinecap: "butt",
                })}
              />
            </div>
            <img src={data[currentMeme].url} className="h-[700px]" alt={`Meme ${currentMeme}`} />
          </div>
        </div>
        */