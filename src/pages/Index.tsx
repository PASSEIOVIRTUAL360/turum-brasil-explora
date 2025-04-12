
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StateSelector from '@/components/StateSelector';
import CitySelector from '@/components/CitySelector';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Index: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const handleDiscover = () => {
    if (selectedState && selectedCity) {
      navigate(`/cidade/${selectedCity}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-turquesa to-petroleo">
      <Header transparent />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            <span className="text-gelo">Tur</span>
            <span className="text-verde">um</span>
          </h1>
          <p className="text-lg text-white mb-8">
            Descubra o Brasil através de experiências autênticas
          </p>
          
          <div className="bg-white rounded-lg shadow-xl p-6 transition-all">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <StateSelector
                  selectedState={selectedState}
                  onChange={(state) => {
                    setSelectedState(state);
                    setSelectedCity('');
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <CitySelector
                  selectedCity={selectedCity}
                  onChange={setSelectedCity}
                  selectedState={selectedState}
                  disabled={!selectedState}
                />
              </div>
              
              <Button
                onClick={handleDiscover}
                disabled={!selectedState || !selectedCity}
                className="w-full bg-turquesa hover:bg-turquesa/90 text-white"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Descobrir
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Destinos populares poderiam ser exibidos aqui */}
        </div>
      </div>
      
      <footer className="bg-petroleo text-white py-4 text-center text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Turum - Experiências turísticas brasileiras
        </div>
      </footer>
    </div>
  );
};

export default Index;
