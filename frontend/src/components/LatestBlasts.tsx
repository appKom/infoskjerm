import { useQuery } from "@tanstack/react-query";
import { BlastType } from "../lib/types";
import { BlastCard } from "./cards/BlastCard";
import { fetchBlasts } from "../api/blastsApi";
import { Error } from "./utils/Error";
import { BlastCardSkeleton } from "./skeletons/BlastCardSkeleton";

const REFETCH_INTERVAL_MINUTES = 15; // how often to refetch blasts from slack
const AMOUNT_OF_BLASTS = 5; // how many blasts to fetch

export const LatestBlasts = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["blasts"],
    queryFn: () => fetchBlasts(AMOUNT_OF_BLASTS),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES,
  });

  if (isError) return <Error />;

  if (data?.length === 0)
    return (
      <p className="text-lg text-gray-500 dark:text-gray-400">
        Her var det tomt :(
      </p>
    );

  return (
    <div className="my-8 flex flex-col gap-8 overflow-hidden w-max">
      {isLoading
        ? [...Array(AMOUNT_OF_BLASTS)].map((_, index) => (
            <BlastCardSkeleton key={index} />
          ))
        : data?.map((blast: BlastType) => (
            <BlastCard key={blast.id} blast={blast} />
          ))}
    </div>
  );
};
