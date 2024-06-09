import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";

const REFETCH_INTERVAL_MINUTES = 15;
const AMOUNT_OF_MEMES = 5;
const SPEED = .25;
const TRAINLENGTH = 3;

export const Memes1 = () => {
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

  if (isLoading) return <div>memes loading...</div>;
  if (isError) return <div>memes error</div>;

  return (
    <div className='px-8 py-5'>
      <div className="mb-5 text-4xl font-bold dark:text-white">Siste memes</div>
      <div ref={divRef} className='relative flex gap-10 mb-5 w-max' style={{ left: `${componentOffset}px` }}>
        {components.map((component, index) => (
          <div key={index} className='flex gap-10'>
            {component.element.map((element) => (
              <img
                className="object-scale-down bg-white border border-gray-200 rounded-lg shadow h-96 dark:bg-gray-800 dark:border-gray-700"
                src={element.url}
                key={element.url}
                alt={`Meme ${element.url}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-5 text-xl dark:text-white">Hentet fra slack-kanalen <span className='font-medium'>#memeogvinogklinoggrin2</span></div>
    </div>
  );
};
