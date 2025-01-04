import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";
import { MemeType } from "../lib/types";
import { MemeCard } from "./cards/MemeCard";
import { InfiniteAnimate } from "./utils/InfiniteAnimate";
import { Error } from "./utils/Error";
import { MemeCardSkeleton } from "./skeletons/MemeCardSkeleton";
import { useEffect, useState } from "react";

const REFETCH_INTERVAL_MINUTES = 60; // how often to refetch memes from slack
const AMOUNT_OF_MEMES = 5; // how many memes to fetch
const SPEED = 0.3; // how fast the memes should move
const TRAINLENGTH = 3; // how many duplicated meme-lists to show for the infinite scroll effect

export const LatestMemes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["memes"],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES,
  });

  const [filteredData, setFilteredData] = useState<MemeType[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data.filter((meme: MemeType) => meme.url !== null));
    }
  }, [data]);

  if (isError) return <Error />;

  if (isLoading) {
    return (
      <InfiniteAnimate axis="y" speed={SPEED} trainLength={TRAINLENGTH}>
        {[...Array(AMOUNT_OF_MEMES)].map((_, index) => (
          <MemeCardSkeleton key={index} />
        ))}
      </InfiniteAnimate>
    );
  }

  if (data?.length === 0 || !data) {
    return (
      <p className="text-lg text-gray-500 dark:text-gray-400">
        Her var det tomt :(
      </p>
    );
  }

  return (
    <InfiniteAnimate axis="y" speed={SPEED} trainLength={TRAINLENGTH}>
      {filteredData.map((meme: MemeType) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </InfiniteAnimate>
  );
};
