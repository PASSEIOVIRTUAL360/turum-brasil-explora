
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';

// Mock de dados para demonstração
const videosByCategory: Record<string, Array<{
  id: string;
  videoUrl: string;
  title: string;
  location: string;
  poster?: string;
}>> = {
  "praias": [
    {
      id: "1",
      videoUrl: "https://static.videezy.com/system/resources/previews/000/046/846/original/laguna_beach_ocean_waves.mp4",
      title: "Praia do Campeche",
      location: "Florianópolis, SC",
      poster: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
    },
    {
      id: "2",
      videoUrl: "https://static.videezy.com/system/resources/previews/000/041/918/original/Palm-Trees.mp4",
      title: "Praia de Jurerê",
      location: "Florianópolis, SC",
      poster: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
    },
    {
      id: "3",
      videoUrl: "https://static.videezy.com/system/resources/previews/000/042/161/original/Stuart_rocks_2.mp4",
      title: "Praia da Joaquina",
      location: "Florianópolis, SC",
      poster: "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    },
  ],
  "trilhas": [
    {
      id: "4",
      videoUrl: "https://static.videezy.com/system/resources/previews/000/047/440/original/P5880779.mp4",
      title: "Trilha do Costão",
      location: "Florianópolis, SC",
      poster: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
    },
    {
      id: "5",
      videoUrl: "https://static.videezy.com/system/resources/previews/000/044/445/original/Waves_crashing_on_beach.mp4",
      title: "Lagoinha do Leste",
      location: "Florianópolis, SC",
      poster: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    },
  ],
};

const VideoFeed: React.FC = () => {
  const { cityId, categorySlug } = useParams<{ cityId: string, categorySlug: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Obter vídeos para a categoria atual
  const videos = categorySlug && videosByCategory[categorySlug] 
    ? videosByCategory[categorySlug] 
    : [];

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClose = () => {
    navigate(`/cidade/${cityId}`);
  };

  // Gesture handling for mobile
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchStartY.current - touchY;
    
    // Swipe up - next video
    if (diff > 50) {
      touchStartY.current = null;
      handleNext();
    } 
    // Swipe down - previous video
    else if (diff < -50) {
      touchStartY.current = null;
      handlePrevious();
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  return (
    <div 
      className="fixed inset-0 bg-black video-feed-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {videos.length > 0 ? (
        <VideoPlayer
          videoUrl={videos[currentIndex].videoUrl}
          title={videos[currentIndex].title}
          location={videos[currentIndex].location}
          poster={videos[currentIndex].poster}
          onNext={currentIndex < videos.length - 1 ? handleNext : undefined}
        />
      ) : (
        <div className="h-full flex items-center justify-center text-white">
          <p className="text-xl">Nenhum vídeo disponível para esta categoria</p>
        </div>
      )}

      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
      >
        <X size={24} />
        <span className="sr-only">Fechar</span>
      </button>
      
      <div className="absolute bottom-4 right-4 z-50 text-white">
        <span>{currentIndex + 1}/{videos.length}</span>
      </div>
    </div>
  );
};

export default VideoFeed;
