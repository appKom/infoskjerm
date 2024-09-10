/* import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi"; */
import { MemeType } from "../lib/types";
import { MemeCard } from "./cards/MemeCard";
import { InfiniteAnimate } from "./utils/InfiniteAnimate";
/* import { Loading } from "./utils/Loading";
import { Error } from "./utils/Error"; */

/* const REFETCH_INTERVAL_MINUTES = 60; // how often to refetch memes from slack
const AMOUNT_OF_MEMES = 5; // how many memes to fetch */
const SPEED = .2; // how fast the memes should move

const TRAINLENGTH = 2; // how many duplicated meme-lists to show for the infinite scroll effect

export const LatestMemes = () => {
  /* let { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  }); */

  /* useEffect(() => {
    console.log("latest memes:")
    console.log(data)
  }, [data]) */

  const data: MemeType[] = [
    {
      id: "F07M3AWPS6M",
      name: "Sparebank1.mov",
      author: "Jo Gramnæs Tjernshaugen",
      author_image: "https://avatars.slack-edge.com/2023-10-15/6034303400982_5a8a12072c0007a91359_72.jpg",
      date: "2024-09-10T09:32:51.000Z",
      url: "http://localhost:3000/images/F07M3AWPS6M-Sparebank1.mov",
      type: "video",
    },
    {
      id: "F07KPCZK79B",
      name: "cm-chat-media-video-27695C2F-2482-46FE-AC92-46241D5F8058.MOV",
      author: "TheThinker",
      author_image: "https://avatars.slack-edge.com/2024-09-03/7665824856326_6f725bb1c3d41093032e_72.png",
      date: "2024-09-03T20:38:45.000Z",
      url: "http://localhost:3000/images/F07KPCZK79B-cm-chat-media-video-27695C2F-2482-46FE-AC92-46241D5F8058.MOV",
      type: "video",
    },
    {
      id: "F07J2AVG98S",
      name: "Steinar Sagen om kjedelige bøker.mp4",
      author: "Jørgen Galdal",
      author_image: "https://avatars.slack-edge.com/2023-02-03/4747126099794_5b45446dddf754c50250_72.png",
      date: "2024-08-22T13:09:08.000Z",
      url: "http://localhost:3000/images/F07J2AVG98S-Steinar%20Sagen%20om%20kjedelige%20b%C3%B8ker.mp4",
      type: "video",
    },
  ];

  /* if (isLoading) return <Loading text="Mekker de ferskeste memesa..." hideLogo />;
  if (isError) return <Error />; */

  if (data?.length === 0) return (
    <p className='text-lg text-gray-500 dark:text-gray-400'>Her var det tomt :(</p>
  )

  return (
    <InfiniteAnimate
      axis='y'
      speed={SPEED}
      trainLength={TRAINLENGTH}
    >
      {data ? data.map((meme: MemeType) => (
        <MemeCard key={meme.id} meme={meme} />
      )) : []}
    </InfiniteAnimate>
  );
};
