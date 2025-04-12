
import React from 'react';
import { Play, Pause, Bookmark, Calendar, Instagram, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  progress: number;
  visible: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  togglePlay,
  progress,
  visible
}) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 flex flex-col justify-between z-10 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Play/Pause button in center */}
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full px-4 mb-1">
        <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
          <div
            className="bg-turquesa h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="z-20 px-4 pb-8 flex justify-around">
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors">
          <Bookmark size={20} />
        </button>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors">
          <Calendar size={20} />
        </button>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors">
          <Phone size={20} />
        </button>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors">
          <Instagram size={20} />
        </button>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors">
          <span className="font-bold">360°</span>
        </button>
      </div>
    </div>
  );
};

export default VideoControls;
