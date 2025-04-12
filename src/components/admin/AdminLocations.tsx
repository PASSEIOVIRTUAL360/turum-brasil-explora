
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AdminLocations = () => {
  const [activeTab, setActiveTab] = useState('states');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados fictícios para estados
  const states = [
    { id: '1', name: 'Santa Catarina', abbreviation: 'SC' },
    { id: '2', name: 'Rio de Janeiro', abbreviation: 'RJ' },
    { id: '3', name: 'São Paulo', abbreviation: 'SP' }
  ];
  
  // Dados fictícios para cidades
  const cities = [
    { id: '1', name: 'Florianópolis', stateId: '1', description: 'Capital de Santa Catarina, conhecida por suas praias.', coverImage: 'floripa.jpg' },
    { id: '2', name: 'Blumenau', stateId: '1', description: 'Cidade com forte colonização alemã.', coverImage: 'blumenau.jpg' },
    { id: '3', name: 'Rio de Janeiro', stateId: '2', description: 'Cidade maravilhosa.', coverImage: 'rio.jpg' },
    { id: '4', name: 'São Paulo', stateId: '3', description: 'Maior cidade do Brasil.', coverImage: 'saopaulo.jpg' }
  ];

  const [expandedState, setExpandedState] = useState<string | null>(null);

  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    state.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleStateExpansion = (stateId: string) => {
    setExpandedState(expandedState === stateId ? null : stateId);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Gerenciar Localizações</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-[#00B4D8] hover:bg-[#0095b3]">
            <Plus size={16} className="mr-1" /> Adicionar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="states" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-80 grid-cols-2 mb-6">
          <TabsTrigger value="states">Estados</TabsTrigger>
          <TabsTrigger value="cities">Cidades</TabsTrigger>
        </TabsList>

        <TabsContent value="states">
          <div className="bg-white border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sigla</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStates.map((state) => (
                  <tr key={state.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{state.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{state.abbreviation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="cities">
          <div className="space-y-4">
            {states.map((state) => (
              <Collapsible 
                key={state.id}
                open={expandedState === state.id}
                onOpenChange={() => toggleStateExpansion(state.id)}
                className="border rounded-md bg-white overflow-hidden"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-sm font-medium">
                  <div className="flex items-center">
                    {expandedState === state.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span className="ml-2">{state.name} ({state.abbreviation})</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {cities.filter(city => city.stateId === state.id).length} cidades
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cities
                          .filter(city => city.stateId === state.id && city.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((city) => (
                            <tr key={city.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{city.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{city.description.substring(0, 50)}...</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                  <Pencil size={16} />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                  <Trash2 size={16} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLocations;
