import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";
import { MemeType } from "../lib/types";
import { MemeCard } from "./cards/MemeCard";
import { Loading } from "./utils/Loading";
import { Error } from "./utils/Error";
import Marquee from "react-fast-marquee";

const REFETCH_INTERVAL_MINUTES = 15; // how often to refetch memes from slack
const AMOUNT_OF_MEMES = 5; // how many memes to fetch
const SPEED = 30; // how fast the memes should move

export const LatestMemes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  if (isLoading) return <Loading text="Mekker de ferskeste memesa..." hideLogo />;
  if (isError) return <Error />;

  if (data?.length === 0) return (
    <p className='text-lg text-gray-500 dark:text-gray-400'>Her var det tomt :(</p>
  )

  return (
    <Marquee speed={SPEED} direction='up' className='w-0 overflow-hidden'>
      {data ? data.map((meme: MemeType) => (
          <MemeCard key={meme.id} meme={meme} />
        )) : []}
    </Marquee>
  );
};