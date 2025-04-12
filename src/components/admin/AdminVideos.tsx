
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Filter, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const AdminVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Categorias disponíveis
  const categories = [
    { id: 'praias', name: 'Praias', color: 'bg-blue-100 text-blue-800' },
    { id: 'trilhas', name: 'Trilhas e Natureza', color: 'bg-green-100 text-green-800' },
    { id: 'restaurantes', name: 'Restaurantes', color: 'bg-orange-100 text-orange-800' },
    { id: 'hoteis', name: 'Hotéis e Pousadas', color: 'bg-purple-100 text-purple-800' },
    { id: 'pontos', name: 'Pontos Turísticos', color: 'bg-red-100 text-red-800' },
    { id: 'eventos', name: 'Eventos', color: 'bg-yellow-100 text-yellow-800' }
  ];
  
  // Dados fictícios de vídeos
  const videos = [
    { 
      id: '1', 
      title: 'Praia de Jurerê Internacional', 
      category: 'praias',
      city: 'Florianópolis', 
      state: 'Santa Catarina',
      videoUrl: 'https://example.com/video1.mp4',
      thumbnailUrl: 'jurerê.jpg',
      whatsappLink: 'https://wa.me/5548999999999',
      instagramLink: 'https://instagram.com/jurere',
      active: true,
      featured: true,
      createdAt: '2023-10-15'
    },
    { 
      id: '2', 
      title: 'Trilha da Costa da Lagoa', 
      category: 'trilhas',
      city: 'Florianópolis', 
      state: 'Santa Catarina',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnailUrl: 'trilha.jpg',
      whatsappLink: 'https://wa.me/5548999999999',
      instagramLink: 'https://instagram.com/costalagoa',
      active: true,
      featured: false,
      createdAt: '2023-09-20'
    },
    { 
      id: '3', 
      title: 'Restaurante Mirante Pão de Açúcar', 
      category: 'restaurantes',
      city: 'Rio de Janeiro', 
      state: 'Rio de Janeiro',
      videoUrl: 'https://example.com/video3.mp4',
      thumbnailUrl: 'restaurante.jpg',
      whatsappLink: 'https://wa.me/5521999999999',
      instagramLink: 'https://instagram.com/mirante',
      active: false,
      featured: false,
      createdAt: '2023-08-10'
    },
  ];
  
  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };
  
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          video.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? video.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Gerenciar Vídeos</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar vídeos..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-[#00B4D8] hover:bg-[#0095b3]">
            <Plus size={16} className="mr-1" /> Adicionar Vídeo
          </Button>
        </div>
      </div>
      
      <div className="mb-6 overflow-auto">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={selectedCategory === category.id ? "bg-[#00B4D8]" : ""}
              size="sm"
              onClick={() => handleCategoryFilter(category.id)}
            >
              {category.name}
            </Button>
          ))}
          {selectedCategory && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedCategory(null)}
              className="text-gray-500"
            >
              Limpar filtro
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Cidade/Estado</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => {
                const category = categories.find(c => c.id === video.category);
                
                return (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded overflow-hidden mr-3 bg-gray-200 flex-shrink-0">
                          {/* Substituir por uma imagem real quando disponível */}
                          <div className="w-full h-full bg-gray-300"></div>
                        </div>
                        <div>
                          {video.title}
                          {video.featured && <Badge className="ml-2 bg-[#FF6B6B]">Destaque</Badge>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={category?.color}>{category?.name}</Badge>
                    </TableCell>
                    <TableCell>{video.city}, {video.state}</TableCell>
                    <TableCell>
                      {video.active ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <Eye size={14} className="mr-1" /> Ativo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                          <EyeOff size={14} className="mr-1" /> Inativo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  Nenhum vídeo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminVideos;
