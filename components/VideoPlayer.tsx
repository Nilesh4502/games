import React, { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
type Props = {
  src: string;
  isHLS?: boolean;
  videoUrl?:string;
  hlsUrl?:string;
  poster?:string;
}

const VideoPlayer: React.FC<Props> = ({ src, isHLS = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHLS) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current?.play();
            setIsPlaying(true);
          });
        } else {
          console.error('HLS not supported');
        }
      } else {
        videoRef.current.src = src;
        videoRef.current.load();
        videoRef.current.oncanplaythrough = () => {
          videoRef.current?.play();
          setIsPlaying(true);
        };
      }
    }
  }, [src, isHLS]);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%' }}
        onPlay={handlePlay}
        onPause={handlePause}
      />
      {!isPlaying && <button onClick={handlePlay}>Play</button>}
      {isPlaying && <button onClick={handlePause}>Pause</button>}
    </div>
  );
};

export default VideoPlayer;
