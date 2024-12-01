import Marquee from "react-fast-marquee";
import { BaseCard } from "../cards/BaseCard";
import { fetchMovemberResults } from "../../api/movemberApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const REFETCH_INTERVAL_MINUTES = 60;

export const MovemberPage = () => {
  const [shuffledData, setShuffledData] = useState<string[]>([]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["memes"],
    queryFn: () => fetchMovemberResults(),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES,
  });

  useEffect(() => {
    if (data) {
      const shuffled = data.sort(() => Math.random() - 0.5);
      setShuffledData(shuffled);
    }
  }, [data]);

  return (
    <div className='relative flex justify-center items-start h-full flex-col gap-16'>
      <div className="flex gap-12 mx-12">
        <img
          src='graphics/warning.svg'
          className='w-32 mx-auto'
        />
        <div>
          <h1 className="text-6xl font-bold mb-4 leading-tight dark:text-white ">
            Gjem barna!
          </h1>
          <p className="text-3xl dark:text-white">
            Årets movember-resultater:
          </p>
        </div>
      </div>
      {
        isError ? (
          <div className="text-2xl text-center text-gray-500 dark:text-gray-400">
            Åneiii, det har skjedd en feil! 😱
          </div>
        ) : isLoading ? (
          <div className="flex animate-pulse">
            {
              Array.from({ length: 7 }).map((_, index) => (
                <BaseCard className="ml-12" key={index}>
                  <img
                    src="graphics/male-placeholder-image.jpeg"
                    className="min-w-[650px] h-[650px]"
                  />
                </BaseCard>
              ))
            }
          </div>
        ) : data?.length > 0 ? (
          <Marquee speed={125}>
            {shuffledData.map((result: any) => (
              <BaseCard className="mr-12" key={result.url}>
                <img
                  src={result.url}
                  className="max-h-[650px]"
                />
              </BaseCard>
            ))}
          </Marquee>
        ) : (
          <div className="text-2xl text-center text-gray-500 dark:text-gray-400">
            Ingen data å vise! 😕
          </div>
        )
      }
    </div>
  )
}
