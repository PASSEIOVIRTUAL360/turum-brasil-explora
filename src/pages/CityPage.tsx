
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryButton from '@/components/CategoryButton';
import { 
  Waves, 
  Mountain, 
  Utensils, 
  Building, 
  Landmark, 
  Calendar 
} from 'lucide-react';

// Mock de dados para demonstração - em produção seria obtido de um banco de dados
const cityData: Record<string, { name: string; description: string }> = {
  "florianopolis": {
    name: "Florianópolis",
    description: "Conhecida como Ilha da Magia, Florianópolis encanta com suas 42 praias, lagoas e dunas. Uma mistura única de natureza exuberante, cultura açoriana e gastronomia de frutos do mar."
  },
  "rio-de-janeiro": {
    name: "Rio de Janeiro",
    description: "A Cidade Maravilhosa é famosa por suas praias, pelo Pão de Açúcar e pelo Cristo Redentor. Uma metrópole vibrante onde a natureza se encontra com o urbano."
  },
  "salvador": {
    name: "Salvador",
    description: "Primeira capital do Brasil, Salvador preserva um rico patrimônio histórico e cultural. Com suas praias, festas populares e centro histórico colorido, é a capital da alegria."
  },
};

const CityPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  
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
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-petroleo mb-4">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aqui entrariam cards com destaques da cidade */}
          </div>
        </div>
      </main>
      
      <footer className="bg-petroleo text-white py-4 text-center text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Turum - Experiências turísticas brasileiras
        </div>
      </footer>
    </div>
  );
};

export default CityPage;
