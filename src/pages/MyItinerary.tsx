
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock de dados para demonstração
const itineraryData = {
  title: "Férias Floripa Maio 2025",
  items: [
    {
      id: "1",
      title: "Praia do Campeche",
      location: "Florianópolis, SC",
      date: "05/05/2025",
      thumbnail: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
    },
    {
      id: "2",
      title: "Trilha do Costão",
      location: "Florianópolis, SC",
      date: "06/05/2025",
      thumbnail: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
    },
    {
      id: "3",
      title: "Restaurante Água e Sal",
      location: "Florianópolis, SC",
      date: "07/05/2025",
      thumbnail: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    }
  ]
};

const MyItinerary: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gelo">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-petroleo">{itineraryData.title}</h1>
            <p className="text-gray-600">Sua agenda personalizada de viagem</p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex gap-2">
              <Plus size={18} />
              Nova Viagem
            </Button>
            
            <Button className="bg-turquesa hover:bg-turquesa/90 flex gap-2">
              <Calendar size={18} />
              Editar Datas
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraryData.items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8">
                    <Trash2 size={16} />
                  </Button>
                </div>
                <CardDescription>{item.location}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1.5">
                    <Calendar size={14} className="text-turquesa" />
                    {item.date}
                  </span>
                  
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Plus size={12} className="mr-1" />
                    Adicionar lembrete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Card para adicionar novo item */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-60 bg-white/50 hover:bg-white/80 transition-colors cursor-pointer">
            <div className="flex flex-col items-center text-gray-500">
              <Plus size={24} className="mb-2" />
              <p>Adicionar local</p>
            </div>
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

export default MyItinerary;
