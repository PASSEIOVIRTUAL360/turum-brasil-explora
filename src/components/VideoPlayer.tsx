
import React, { useState, useRef, useEffect } from 'react';
import VideoControls from './VideoControls';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  location: string;
  poster?: string;
  onNext?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  location,
  poster,
  onNext
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Iniciar o vídeo quando carregado
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video on change
    video.currentTime = 0;
    setProgress(0);
    
    // Autoplay on mount or when video changes
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay prevented:', error);
        setIsPlaying(false);
      }
    };

    playVideo();

    // Update progress
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);

    // Handle end of video
    const handleVideoEnd = () => {
      if (onNext) {
        onNext();
      } else {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [videoUrl, onNext]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTouch = () => {
    togglePlay();
    setShowControls(true);
    
    // Hide controls after delay
    setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div className="relative w-full h-full" onClick={handleTouch}>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        loop={!onNext}
        playsInline
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent py-6 px-4">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white/90 text-sm">{location}</p>
      </div>

      <VideoControls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        progress={progress}
        visible={showControls}
      />
    </div>
  );
};

export default VideoPlayer;
