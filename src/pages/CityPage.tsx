
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryButton from '@/components/CategoryButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Waves, 
  Mountain, 
  Utensils, 
  Building, 
  Landmark, 
  Calendar,
  Video,
  Compass
} from 'lucide-react';

// Mock de dados para demonstração - em produção seria obtido de um banco de dados
const cityData: Record<string, { 
  name: string; 
  description: string;
  panoramas?: Array<{
    id: string;
    title: string;
    category: string;
    thumbnailUrl: string;
  }>;
  featuredVideos?: Array<{
    id: string;
    title: string;
    category: string;
    thumbnailUrl: string;
  }>;
}> = {
  "florianopolis": {
    name: "Florianópolis",
    description: "Conhecida como Ilha da Magia, Florianópolis encanta com suas 42 praias, lagoas e dunas. Uma mistura única de natureza exuberante, cultura açoriana e gastronomia de frutos do mar.",
    panoramas: [
      { 
        id: "1", 
        title: "Vista 360° da Praia do Campeche", 
        category: "praias", 
        thumbnailUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
      },
      { 
        id: "2", 
        title: "Tour 360° no Mercado Público", 
        category: "pontos-turisticos", 
        thumbnailUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
      }
    ],
    featuredVideos: [
      {
        id: "1",
        title: "Pôr do sol na Joaquina",
        category: "praias",
        thumbnailUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
      },
      {
        id: "2",
        title: "Restaurante Ostradamus",
        category: "restaurantes",
        thumbnailUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
      }
    ]
  },
  "rio-de-janeiro": {
    name: "Rio de Janeiro",
    description: "A Cidade Maravilhosa é famosa por suas praias, pelo Pão de Açúcar e pelo Cristo Redentor. Uma metrópole vibrante onde a natureza se encontra com o urbano.",
    panoramas: [
      { 
        id: "3", 
        title: "Cristo Redentor 360°", 
        category: "pontos-turisticos", 
        thumbnailUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
      }
    ]
  },
  "salvador": {
    name: "Salvador",
    description: "Primeira capital do Brasil, Salvador preserva um rico patrimônio histórico e cultural. Com suas praias, festas populares e centro histórico colorido, é a capital da alegria."
  },
};

const CityPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [activePanorama, setActivePanorama] = useState<string | null>(null);
  
  const city = cityId && cityData[cityId] ? cityData[cityId] : {
    name: "Cidade não encontrada",
    description: "Desculpe, não encontramos informações sobre esta cidade."
  };

  const categories = [
    { 
      title: "Praias", 
      icon: <Waves />, 
      color: "bg-turquesa", 
      slug: "praias" 
    },
    { 
      title: "Trilhas e Natureza", 
      icon: <Mountain />, 
      color: "bg-verde", 
      slug: "trilhas" 
    },
    { 
      title: "Restaurantes", 
      icon: <Utensils />, 
      color: "bg-coral", 
      slug: "restaurantes" 
    },
    { 
      title: "Hotéis e Pousadas", 
      icon: <Building />, 
      color: "bg-petroleo", 
      slug: "hoteis" 
    },
    { 
      title: "Pontos Turísticos", 
      icon: <Landmark />, 
      color: "bg-turquesa/90", 
      slug: "pontos-turisticos" 
    },
    { 
      title: "Eventos", 
      icon: <Calendar />, 
      color: "bg-verde/90", 
      slug: "eventos" 
    },
  ];

  // Modal para visualização de panorama 360°
  const handleClosePanorama = () => setActivePanorama(null);

  return (
    <div className="min-h-screen flex flex-col bg-gelo">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-petroleo mb-2">{city.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{city.description}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryButton
              key={category.slug}
              title={category.title}
              icon={category.icon}
              color={category.color}
              cityId={cityId || ''}
              categorySlug={category.slug}
            />
          ))}
        </div>
        
        {/* Seção de Panoramas 360° */}
        {city.panoramas && city.panoramas.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-petroleo">Panoramas 360°</h2>
              <Button variant="outline" size="sm">
                Ver todos <Compass className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.panoramas.map(panorama => (
                <div key={panorama.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={panorama.thumbnailUrl}
                      alt={panorama.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-[#003049]">
                        <Compass size={14} className="mr-1" /> 360°
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                      <Button 
                        className="bg-[#00B4D8] hover:bg-[#0095b3]"
                        onClick={() => setActivePanorama(panorama.id)}
                      >
                        Visualizar em 360°
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800">{panorama.title}</h3>
                    <p className="text-sm text-gray-500">{categories.find(c => c.slug === panorama.category)?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Seção de Vídeos em Destaque */}
        {city.featuredVideos && city.featuredVideos.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-petroleo">Vídeos em Destaque</h2>
              <Button variant="outline" size="sm">
                Ver todos <Video className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.featuredVideos.map(video => (
                <Link 
                  key={video.id} 
                  to={`/cidade/${cityId}/categoria/${video.category}`} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Video className="h-6 w-6 text-[#00B4D8]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800">{video.title}</h3>
                    <p className="text-sm text-gray-500">{categories.find(c => c.slug === video.category)?.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* Modal para panorama 360° */}
      {activePanorama && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            {/* Aqui seria inserido o visualizador 360° */}
            <div className="bg-black h-full flex items-center justify-center">
              <p className="text-white text-center">
                <Compass size={48} className="mx-auto mb-4" />
                Visualização panorâmica 360°
                <br />
                <span className="text-sm opacity-60">
                  (O visualizador 360° será carregado aqui)
                </span>
              </p>
            </div>
            
            <Button
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
              onClick={handleClosePanorama}
              size="icon"
              variant="ghost"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
        </div>
      )}
      
      <footer className="bg-petroleo text-white py-4 text-center text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Turum - Experiências turísticas brasileiras
        </div>
      </footer>
    </div>
  );
};

export default CityPage;
