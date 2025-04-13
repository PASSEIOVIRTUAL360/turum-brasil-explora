
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Panorama360Viewer from '@/components/Panorama360Viewer';

// Mock data for 360° photos
const panoramasByCategory: Record<string, Array<{
  id: string;
  imageUrl: string;
  title: string;
  location: string;
}>> = {
  "praias": [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&q=80&w=2000&panorama=true",
      title: "Praia do Campeche 360°",
      location: "Florianópolis, SC"
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&q=80&w=2000&panorama=true",
      title: "Praia de Jurerê 360°",
      location: "Florianópolis, SC"
    }
  ],
  "pontos": [
    {
      id: "3",
      imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&q=80&w=2000&panorama=true",
      title: "Ponte Hercílio Luz 360°",
      location: "Florianópolis, SC"
    }
  ],
};

const Panorama360Page: React.FC = () => {
  const { cityId, categorySlug } = useParams<{ cityId: string; categorySlug: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get panoramas for the current category
  const panoramas = categorySlug && panoramasByCategory[categorySlug] 
    ? panoramasByCategory[categorySlug] 
    : [];

  const handleClose = () => {
    navigate(`/cidade/${cityId}`);
  };

  const handleNext = () => {
    if (currentIndex < panoramas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      {panoramas.length > 0 ? (
        <>
          <div className="h-full">
            <Panorama360Viewer 
              imageUrl={panoramas[currentIndex].imageUrl} 
              className="w-full h-full"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-white text-xl font-bold">{panoramas[currentIndex].title}</h3>
            <p className="text-white/90">{panoramas[currentIndex].location}</p>
          </div>
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          >
            <X size={24} />
            <span className="sr-only">Fechar</span>
          </button>
          
          <div className="absolute bottom-4 right-4 text-white">
            <span>{currentIndex + 1}/{panoramas.length}</span>
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {currentIndex > 0 && (
              <button 
                onClick={handlePrevious}
                className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3"
              >
                ← Anterior
              </button>
            )}
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {currentIndex < panoramas.length - 1 && (
              <button 
                onClick={handleNext}
                className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3"
              >
                Próximo →
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-xl">Nenhuma foto 360° disponível para esta categoria</p>
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-[#00B4D8] rounded text-white"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panorama360Page;
