import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import FileUpload from './FileUpload';
import { Textarea } from '@/components/ui/textarea';

const AdminVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false);
  
  // Form state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('');
  const [videoCity, setVideoCity] = useState('');
  const [videoState, setVideoState] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [videoDescription, setVideoDescription] = useState('');
  
  // Categorias disponíveis
  const categories = [
    { id: 'praias', name: 'Praias', color: 'bg-blue-100 text-blue-800' },
    { id: 'trilhas', name: 'Trilhas e Natureza', color: 'bg-green-100 text-green-800' },
    { id: 'restaurantes', name: 'Restaurantes', color: 'bg-orange-100 text-orange-800' },
    { id: 'hoteis', name: 'Hotéis e Pousadas', color: 'bg-purple-100 text-purple-800' },
    { id: 'pontos', name: 'Pontos Turísticos', color: 'bg-red-100 text-red-800' },
    { id: 'eventos', name: 'Eventos', color: 'bg-yellow-100 text-yellow-800' }
  ];
  
  // Dados fictícios de estados e cidades
  const states = [
    { id: 'SC', name: 'Santa Catarina' },
    { id: 'RJ', name: 'Rio de Janeiro' },
    { id: 'SP', name: 'São Paulo' }
  ];
  
  const cities = [
    { id: '1', name: 'Florianópolis', stateId: 'SC' },
    { id: '2', name: 'Balneário Camboriú', stateId: 'SC' },
    { id: '3', name: 'Rio de Janeiro', stateId: 'RJ' },
    { id: '4', name: 'São Paulo', stateId: 'SP' }
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

  const handleAddVideo = () => {
    // Aqui você implementaria a lógica para adicionar o vídeo
    console.log({
      title: videoTitle,
      category: videoCategory,
      city: videoCity,
      state: videoState,
      whatsappLink,
      instagramLink,
      active: isActive,
      featured: isFeatured,
      videoFile,
      thumbnailFile
    });
    
    // Resetar formulário e fechar o modal
    resetForm();
    setIsAddVideoDialogOpen(false);
  };
  
  const resetForm = () => {
    setVideoTitle('');
    setVideoCategory('');
    setVideoCity('');
    setVideoState('');
    setWhatsappLink('');
    setInstagramLink('');
    setIsActive(true);
    setIsFeatured(false);
    setVideoFile(null);
    setThumbnailFile(null);
      setVideoDescription('');
  };
  
  // Filtra as cidades baseado no estado selecionado
  const filteredCities = videoState 
    ? cities.filter(city => city.stateId === videoState)
    : [];

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
          <Dialog open={isAddVideoDialogOpen} onOpenChange={setIsAddVideoDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#00B4D8] hover:bg-[#0095b3]">
                <Plus size={16} className="mr-1" /> Adicionar Vídeo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Vídeo</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="video-title">Título do Vídeo</Label>
                    <Input 
                      id="video-title" 
                      placeholder="Digite o título do vídeo"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="video-category">Categoria</Label>
                    <Select value={videoCategory} onValueChange={setVideoCategory}>
                      <SelectTrigger id="video-category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="video-state">Estado</Label>
                    <Select value={videoState} onValueChange={setVideoState}>
                      <SelectTrigger id="video-state">
                        <SelectValue placeholder="Selecione um estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state.id} value={state.id}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="video-city">Cidade</Label>
                  <Select value={videoCity} onValueChange={setVideoCity} disabled={!videoState}>
                    <SelectTrigger id="video-city">
                      <SelectValue placeholder={videoState ? "Selecione uma cidade" : "Selecione um estado primeiro"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCities.map(city => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="video-whatsapp">Link do WhatsApp</Label>
                    <Input 
                      id="video-whatsapp" 
                      placeholder="https://wa.me/5548999999999"
                      value={whatsappLink}
                      onChange={(e) => setWhatsappLink(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="video-instagram">Link do Instagram</Label>
                    <Input 
                      id="video-instagram" 
                      placeholder="https://instagram.com/local"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                    />
                  </div>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUpload 
                        id="video-file" 
                        label="Arquivo de vídeo" 
                        accept="video/mp4,video/quicktime,video/x-m4v" 
                        maxSizeMB={200}
                        onChange={setVideoFile}
                        value={videoFile}
                      />
                      
                      <FileUpload 
                        id="thumbnail-file" 
                        label="Imagem de capa do vídeo" 
                        accept="image/jpeg,image/png,image/jpg" 
                        onChange={setThumbnailFile}
                        value={thumbnailFile}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="video-active" checked={isActive} onCheckedChange={setIsActive} />
                    <Label htmlFor="video-active">Ativo</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="video-featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                    <Label htmlFor="video-featured">Destaque</Label>
                  </div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="video-description">Descrição</Label>
                  <Textarea 
                    id="video-description" 
                    placeholder="Digite uma breve descrição do vídeo"
                    rows={3}
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="button" className="bg-[#00B4D8] hover:bg-[#0095b3]" onClick={handleAddVideo}>
                  Salvar Vídeo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                          {video.thumbnailUrl ? (
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title}
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                              <Video size={18} className="text-gray-500" />
                            </div>
                          )}
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
