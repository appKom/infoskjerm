import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";
import { MemeType } from "../lib/types";
import { MemeCard } from "./cards/MemeCard";
import { InfiniteAnimate } from "./utils/InfiniteAnimate";
import { Loading } from "./utils/Loading";
import { Error } from "./utils/Error";
import { useEffect, useState } from "react";

const REFETCH_INTERVAL_MINUTES = 60; // how often to refetch memes from slack
const AMOUNT_OF_MEMES = 5; // how many memes to fetch
const SPEED = .3; // how fast the memes should move

const TRAINLENGTH = 3; // how many duplicated meme-lists to show for the infinite scroll effect

export const LatestMemes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  // TEMPORARY START - until video frontend is finished
  const [filteredMemes, setFilteredMemes] = useState<MemeType[]>([]);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(item => item?.type === 'image');
      setFilteredMemes(filteredData);
    }
  }, [data]);
  // TEMPORARY END

  if (isLoading) return <Loading text="Mekker de ferskeste memesa..." hideLogo />;
  if (isError) return <Error />;

  if (filteredMemes?.length === 0) return (
    <p className='text-lg text-gray-500 dark:text-gray-400'>Her var det tomt :(</p>
  )

  return (
    <InfiniteAnimate
      axis='y'
      speed={SPEED}
      trainLength={TRAINLENGTH}
    >
      {filteredMemes ? filteredMemes.map((meme: MemeType) => (
        <MemeCard key={meme.id} meme={meme} />
      )) : []}
    </InfiniteAnimate>
  );
};
