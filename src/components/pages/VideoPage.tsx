import { useEffect, useState } from "react";
import { getRandomElement } from "../../lib/misc";

const videoIds = [
  'A03oI0znAoc', // Abdul Bari big O
  'Rsf35tugWkg', // low quality pausefisk
  'b65MoVwANq4', // disco fruit party
  'AgpWX18dby4', // 4K ocean
  'AaK0AKQFCNY', // kittens
  'oRDRfikj2z8', // baby animals
];

const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;

const fetchVideoDuration = async (videoId: string): Promise<number | null> => {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}&cc_lang_pref=en`);
    const data = await response.json();

    if (data?.items?.length > 0) {
      return parseISODuration(data.items[0].contentDetails.duration);
    }
  } catch (error) {
    console.error('Error fetching video duration:', error);
  }
  return null;
};

const parseISODuration = (isoDuration: string): number => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  const hours = parseInt(matches?.[1] || '0', 10);
  const minutes = parseInt(matches?.[2] || '0', 10);
  const seconds = parseInt(matches?.[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
};

const getRandomStartPoint = (totalDuration: number, videoTime: number): number =>
  Math.floor(Math.random() * totalDuration - videoTime)

export const VideoPage = ({ pageTime }: { pageTime: number }) => {
  const [videoId, setVideoId] = useState<string>()
  const [videoUrl, setVideoUrl] = useState<string>()

  useEffect(() => setVideoId(getRandomElement(videoIds)), []);

  useEffect(() => {
    const getVideoDuration = async() => {
      if (!videoId) return
      const videoDuration = await fetchVideoDuration(videoId);

      if (!videoDuration) return
      const startPoint = getRandomStartPoint(videoDuration, pageTime);

      const videoUrl = `https://www.youtube.com/embed/${videoId}?cc_load_policy=1&autoplay=1&controls=0&showinfo=0&mute=1&start=${startPoint}`
      setVideoUrl(videoUrl)
    }
    getVideoDuration();
  }, [videoId]);

  if (!videoId || !videoUrl) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="dark:text-white w-max">OOpsie dopsie, noe galt har skjedd :o</div>
      </div>
    );
  }

  return <iframe className="w-full h-full" src={videoUrl} />;
};
