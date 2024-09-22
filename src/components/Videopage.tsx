import { useEffect, useState } from "react";

const videoIds = [
  'G52dUQLxPzg',
  '0IAPZzGSbME'
];

const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;

function randomVideo(){
  const randomIndex = Math.floor(Math.random() * videoIds.length);
  return videoIds[randomIndex];
}

const fetchVideoDuration = async(videoId) => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}`);
  const data = await response.json();

  if (data && data.items && data.items.length > 0) {
    return parseISODuration(data.items[0].contentDetails.duration);
  }
  return null;
};

const parseISODuration = (isoDuration) => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  const hours = parseInt(matches[1] || 0, 10);
  const minutes = parseInt(matches[2] || 0, 10);
  const seconds = parseInt(matches[3] || 0, 10);

  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

function getRandomStartPoint(videoDuration:number){
  return Math.floor(Math.random() * videoDuration);
}

export function Videopage(){
  const [videoId, setVideoId] = useState<string>()
  const [randomStartPoint, setRandomStartPoint] = useState<number>()

  useEffect(() => {
    setVideoId(randomVideo);
  }, []);

  useEffect(() => {
    const getVideoDuration = async() => {
      if(!videoId) return
      setRandomStartPoint(getRandomStartPoint(await fetchVideoDuration(videoId)))
      console.log(await fetchVideoDuration(videoId))
      console.log(getRandomStartPoint(await fetchVideoDuration(videoId)));
    }
    getVideoDuration();
  }, [videoId]);

  useEffect(() => {
    console.log("randomStartPoint:", randomStartPoint)
  }, [randomStartPoint])

  if(randomStartPoint === undefined){
    return (
      <div>Heihei</div>
    )
  }

  return (
    <iframe 
    className="h-full w-full"
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&cc_load_policy=1&start=${randomStartPoint}`}
    ></iframe>
  )
}

