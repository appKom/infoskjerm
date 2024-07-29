import { useQuery } from "@tanstack/react-query";
import { BlastType } from "../lib/types";
import { InfiniteAnimate } from "./utils/InfiniteAnimate";
import { BlastCard } from "./cards/BlastCard";
import { fetchBlasts } from "../api/blastsApi";
import { Loading } from "./utils/Loading";
import { Error } from "./utils/Error";

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

  if (isLoading) return <Loading text="Henter nyeste blæsts..." hideLogo />;
  if (isError) return <Error />;

  if (data?.length === 0) return (
    <p className='text-lg text-gray-500 dark:text-gray-400'>Her var det tomt :(</p>
  )

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