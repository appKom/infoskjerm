import { useQuery } from "@tanstack/react-query";
import { BlastType } from "../lib/types";
import { InfiniteAnimate } from "./InfiniteAnimate";
import { BlastCard } from "./BlastCard";
import { fetchBlasts } from "../api/blastsApi";

const REFETCH_INTERVAL_MINUTES = 15; // how often to refetch blasts from slack
const AMOUNT_OF_BLASTS = 5; // how many blasts to fetch
const SPEED = .1; // how fast the blasts should move

const TRAINLENGTH = 2; // how many duplicated blasts-lists to show for the infinite scroll effect

export const LatestBlasts = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['blasts'],
    queryFn: () => fetchBlasts(AMOUNT_OF_BLASTS),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  if (isLoading) return <div className="flex items-center justify-center h-full animate-pulse dark:text-white">Henter blæsts...</div>;
  if (isError) return <div>memes error</div>;

  return (
    <InfiniteAnimate
      axis='y'
      speed={SPEED}
      trainLength={TRAINLENGTH}
    >
      {data ? data.map((blast: BlastType) => (
        <BlastCard key={blast.id} blast={blast} />
      )) : []}
    </InfiniteAnimate>
  );
};