import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";
import { MemeType } from "../lib/types";
import { MemeCard } from "./MemeCard";

const REFETCH_INTERVAL_MINUTES = 15; // how often to refetch memes from slack
const AMOUNT_OF_MEMES = 10; // how many memes to fetch
const SPEED = .25; // how fast the memes should move

const TRAINLENGTH = 2; // how many duplicated meme-lists to show for the infinite scroll effect

const MEME_HEIGHT_PX = 700; // height of the meme images

type ComponentType = {
  id: number;
  element: MemeType[];
};

export const LatestMemes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  const [components, setComponents] = useState<ComponentType[]>([]);
  const [divWidth, setDivWidth] = useState(0);
  const [componentOffset, setComponentOffset] = useState(0);

  const memesArray = useRef<MemeType[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);
  const divRef = useRef(null);
  const resizeObserver = useRef(new ResizeObserver(entries => {
    for (const entry of entries) {
      setDivWidth(entry.contentRect.width);
    }
  }));

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
      return () => {
        if (typeof intervalRef.current !== 'undefined') {
          clearInterval(intervalRef.current);
        }
      };
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

  if (isLoading) return <div className="flex items-center justify-center h-full animate-pulse dark:text-white">Henter de hotteste memsa på markedet...</div>;
  if (isError) return <div>memes error</div>;

  return (
    <div>
      <div className="mb-5 text-4xl font-bold dark:text-white">Siste fra #memeogvinogklinoggrin2</div>
      <div
        ref={divRef}
        className='relative flex gap-8 overflow-hidden w-max'
        style={{ left: `${componentOffset}px` }}
      >
        {components.map((component, index) => (
          <div
            key={index}
            className='flex gap-8'
          >
            {component.element.map((meme) => (
              <MemeCard key={meme.url} meme={meme} height={MEME_HEIGHT_PX} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-5 text-xl dark:text-white">Hentet fra <span className='font-medium'>online-slacken</span> (onlinentnu.slack.com)</div>
    </div>
  );
};

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