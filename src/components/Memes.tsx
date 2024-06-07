import { useQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/memesApi";

const REFETCH_INTERVAL_MINUTES = 15;
const AMOUNT_OF_MEMES = 10;

export const Memes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetchMemes(AMOUNT_OF_MEMES),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  if (isLoading) return <div>memes loading...</div>;
  if (isError) return <div>memes error</div>;

  const handleImageError = (event) => {
    event.target.style.display = 'none'; // Hides the img element if it fails to load
  };

  return (
    <div className='px-8 py-5'>
      <div className="mb-5 text-4xl font-bold dark:text-white">Siste memes</div>
      <div className="flex flex-wrap justify-start max-w-full gap-8">
        {data && data.map((meme, index) => (
          <img className="self-center max-w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow h-96 dark:bg-gray-800 dark:border-gray-700" src={meme} key={index} alt={`Meme ${index}`} onError={handleImageError} />
        ))}
      </div>
      <div className="mt-5 text-xl dark:text-white">Hentet fra slack-kanalen <span className='font-medium'>#memeogvinogklinoggrin2</span></div>
    </div>
  );
}
