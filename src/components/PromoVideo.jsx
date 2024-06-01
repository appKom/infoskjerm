/* global process */
import React from 'react';
import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const PLAYLIST_ID = 'PL9FUXHTBubp-_e0wyNu1jfVVJ2QVAi5NW'; // replace this with the actual youtube playlist-id

const VIDEO_FREQUENCY_MINUTES = 10;

const PromoVideo = () => {
  const [ videoId, setVideoId ] = useState('');
  const [ isVideoPlaying, setIsVideoPlaying ] = useState(false);

  const fetchRandomVideoFromPlaylist = async() => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`);
    const data = await response.json();
    if (data && data.items) {
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const selectedVideoId = data.items[randomIndex].snippet.resourceId.videoId;
      setVideoId(selectedVideoId);
      return fetchVideoDuration(selectedVideoId);
    }
  };

  useEffect(() => {
    const setupVideo = async() => {
      if (!isVideoPlaying) {
        const duration = await fetchRandomVideoFromPlaylist();
        if (duration) {
          setIsVideoPlaying(true);
          setTimeout(() => {
            setIsVideoPlaying(false);
          }, duration + 1000); // Add a second so the video has some time to load
        }
      }
    };

    // Set up the interval
    setupVideo();
    const interval = setInterval(setupVideo, VIDEO_FREQUENCY_MINUTES * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    isVideoPlaying && (
      <iframe
        title="ytplayer"
        id="ytplayer"
        type="text/html"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&cc_load_policy=1`}
        frameBorder="0"
        allow="autoplay"
        autoPlay
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          zIndex: 1000,
        }}
      ></iframe>
    )
  );
};

export default PromoVideo;

const parseISODuration = (isoDuration) => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  const hours = parseInt(matches[1] || 0, 10);
  const minutes = parseInt(matches[2] || 0, 10);
  const seconds = parseInt(matches[3] || 0, 10);

  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

const fetchVideoDuration = async(videoId) => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}`);
  const data = await response.json();
  if (data && data.items && data.items.length > 0) {
    return parseISODuration(data.items[0].contentDetails.duration);
  }
  return null;
};