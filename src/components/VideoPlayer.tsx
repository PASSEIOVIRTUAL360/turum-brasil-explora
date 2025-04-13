
import React, { useState, useRef, useEffect } from 'react';
import VideoControls from './VideoControls';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  location: string;
  poster?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  location,
  poster,
  onNext,
  onPrevious,
  autoplay = true,
  muted = true,
  loop = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Iniciar o vídeo quando carregado
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video on change
    video.currentTime = 0;
    setProgress(0);
    
    // Apply muted state
    video.muted = isMuted;
    
    // Autoplay on mount or when video changes
    if (autoplay) {
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
    }

    // Update progress
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);

    // Handle end of video
    const handleVideoEnd = () => {
      if (onNext && !loop) {
        onNext();
      } else if (loop) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleVideoEnd);
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [videoUrl, onNext, autoplay, loop, isMuted]);

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTouch = () => {
    // Toggle controls visibility on touch/click
    setShowControls(true);
    
    // Hide controls after delay
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Track touch start for swipe detection
    const touchY = e.touches[0].clientY;
    let startY = touchY;
    let touchStartTime = Date.now();

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      const touchTime = Date.now() - touchStartTime;
      
      // Check if it's a fast vertical swipe (up or down)
      if (Math.abs(deltaY) > 50 && touchTime < 300) {
        if (deltaY > 0 && onNext) {
          // Swipe up - next video
          onNext();
        } else if (deltaY < 0 && onPrevious) {
          // Swipe down - previous video
          onPrevious();
        }
        
        // Clean up event listeners
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    // Add temporary listeners for this touch interaction
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      className="relative w-full h-full" 
      onClick={handleTouch}
      onTouchStart={handleTouchStart}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        loop={loop && !onNext}
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
        isMuted={isMuted}
        toggleMute={toggleMute}
        progress={progress}
        visible={showControls}
        onNextVideo={onNext}
        onPreviousVideo={onPrevious}
      />
    </div>
  );
};

export default VideoPlayer;
