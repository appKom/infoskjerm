
import { CSSProperties, useEffect, useRef } from "react";
import { useIsVisible } from "../lib/useIsVisible";


type VideoComponentProps = {
  src: string;
  poster?: string;
  alt?: string;
  style?: CSSProperties;
};
export const VideoComponent = ({
  src,
  poster,
  style,
  alt,
}: VideoComponentProps) => {
  const { isVisible, targetRef } = useIsVisible(
    {
      root: null,
      rootMargin: "500px",
      threshold: 0.1,
    },
    false,
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleVideoPlayback = async () => {
      if (isVisible) {
        await videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    };
  
    handleVideoPlayback();
  }, [isVisible]);

  return (
    <span
      ref={targetRef as any}
      style={{
        position: "relative",
        minHeight: "50px",
        height: "100%",
      }}
    >
      <video
        ref={videoRef}
        loop
        muted
        autoPlay={false}
        preload="none"
        playsInline
        poster={poster}
        aria-label={alt}
        style={{
          objectFit: "contain",
          display: "block",
          width: "100%",
          height: "100%",
          ...style,
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag. Please try viewing this
        page in a modern browser.
      </video>
    </span>
  );
};
