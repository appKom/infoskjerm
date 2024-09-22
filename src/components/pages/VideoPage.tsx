import { useEffect, useState } from "react";

const videoIds = [
  'A03oI0znAoc', // Abdul Bari big O
  'Rsf35tugWkg', // low quality pausefisk
  'b65MoVwANq4', // disco fruit party
  'AgpWX18dby4', // 4K ocean
  'AaK0AKQFCNY', // kittens
  'oRDRfikj2z8', // baby animals
];

const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;

const randomVideo= (): string => {
  const randomIndex = Math.floor(Math.random() * videoIds.length);
  return videoIds[randomIndex];
}

const fetchVideoDuration = async (videoId: string) => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}&cc_lang_pref=en`);
  const data = await response.json();

  if (data && data.items && data.items.length > 0) {
    return parseISODuration(data.items[0].contentDetails.duration);
  }
  return null;
};

const parseISODuration = (isoDuration: string): number => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  if (!matches) return 0; // Handle the case where the regex doesn't match

  const hours = parseInt(matches[1] || '0', 10);
  const minutes = parseInt(matches[2] || '0', 10);
  const seconds = parseInt(matches[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
};

const getRandomStartPoint = (totalVideoDuration: number, videoTime: number): number => {
  return Math.floor(Math.random() * totalVideoDuration - videoTime);
}

export const VideoPage = (props: {pageTime: number}) => {
  const [videoId, setVideoId] = useState<string>()
  const [randomStartPoint, setRandomStartPoint] = useState<number>()
  const [videoUrl, setVideoUrl] = useState<string>()

  useEffect(() => {
    setVideoId(randomVideo);
  }, []);

  useEffect(() => {
    const getVideoDuration = async() => {
      if (!videoId) return
      const videoDuration = await fetchVideoDuration(videoId);
      if (!videoDuration) return
      const randomStartPoint = getRandomStartPoint(videoDuration, props.pageTime);
      const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&cc_load_policy=1&showinfo=0&start=${randomStartPoint}`

      setRandomStartPoint(randomStartPoint)
      setVideoUrl(videoUrl)
    }
    getVideoDuration();
  }, [videoId]);

  if (!videoId || !randomStartPoint || !videoUrl) return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="dark:text-white w-max">OOpsie dopsie, noe galt har skjedd :o</div>
    </div>
  )

  return (
    <iframe
      className="w-full h-full"
      src={videoUrl}
    />
  )
}