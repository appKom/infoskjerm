import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";
import { MemeType } from "../lib/types";
import { MemeCard } from "./MemeCard";
import { InfiniteAnimate } from "./InfiniteAnimate";

const REFETCH_INTERVAL_MINUTES = 15; // how often to refetch memes from slack
const AMOUNT_OF_MEMES = 5; // how many memes to fetch
const SPEED = .25; // how fast the memes should move

const TRAINLENGTH = 2; // how many duplicated meme-lists to show for the infinite scroll effect

const MEME_WIDTH_PX = 550; // height of the meme images

export const LatestMemes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  if (isLoading) return <div className="flex items-center justify-center h-full animate-pulse dark:text-white">Henter de hotteste memsa på markedet...</div>;
  if (isError) return <div>memes error</div>;

  return (
    <InfiniteAnimate
      axis='y'
      speed={SPEED}
      trainLength={TRAINLENGTH}
    >
      {data ? data.map((meme: MemeType) => (
        <MemeCard key={meme.id} meme={meme} width={MEME_WIDTH_PX} />
      )) : []}
    </InfiniteAnimate>
  );
};