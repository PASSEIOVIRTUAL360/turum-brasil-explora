
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import FileUpload from './FileUpload';

const AdminPhotos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);
  
  // Form state
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState('');
  const [photoCity, setPhotoCity] = useState('');
  const [photoState, setPhotoState] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isCover, setIsCover] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  
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
  
  // Dados fictícios de fotos
  const photos = [
    { 
      id: '1', 
      title: 'Vista aérea de Balneário Camboriú', 
      category: 'pontos',
      city: 'Balneário Camboriú', 
      state: 'Santa Catarina',
      imageUrl: '/balneario.jpg',
      description: 'Vista panorâmica da cidade, mostrando seus arranha-céus à beira-mar.',
      isCover: true,
      active: true,
      createdAt: '2023-11-05'
    },
    { 
      id: '2', 
      title: 'Praia do Rosa', 
      category: 'praias',
      city: 'Imbituba', 
      state: 'Santa Catarina',
      imageUrl: '/rosa.jpg',
      description: 'Uma das praias mais bonitas do Brasil, com formato de ferradura.',
      isCover: false,
      active: true,
      createdAt: '2023-10-22'
    },
    { 
      id: '3', 
      title: 'Restaurante Mangue Azul', 
      category: 'restaurantes',
      city: 'Florianópolis', 
      state: 'Santa Catarina',
      imageUrl: '/restaurante.jpg',
      description: 'Restaurante especializado em frutos do mar com vista para a Lagoa da Conceição.',
      isCover: false,
      active: false,
      createdAt: '2023-09-18'
    },
  ];
  
  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };
  
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          photo.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? photo.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddPhoto = () => {
    // Aqui você implementaria a lógica para adicionar a foto
    console.log({
      title: photoTitle,
      category: photoCategory,
      city: photoCity,
      state: photoState,
      description: photoDescription,
      active: isActive,
      isCover: isCover,
      photoFile
    });
    
    // Resetar formulário e fechar o modal
    resetForm();
    setIsAddPhotoDialogOpen(false);
  };
  
  const resetForm = () => {
    setPhotoTitle('');
    setPhotoCategory('');
    setPhotoCity('');
    setPhotoState('');
    setPhotoDescription('');
    setIsActive(true);
    setIsCover(false);
    setPhotoFile(null);
  };
  
  // Filtra as cidades baseado no estado selecionado
  const filteredCities = photoState 
    ? cities.filter(city => city.stateId === photoState)
    : [];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Gerenciar Fotos</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar fotos..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddPhotoDialogOpen} onOpenChange={setIsAddPhotoDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#00B4D8] hover:bg-[#0095b3]">
                <Plus size={16} className="mr-1" /> Adicionar Foto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Foto</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="photo-title">Título da Foto</Label>
                    <Input 
                      id="photo-title" 
                      placeholder="Digite o título da foto"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="photo-category">Categoria</Label>
                    <Select value={photoCategory} onValueChange={setPhotoCategory}>
                      <SelectTrigger id="photo-category">
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
                    <Label htmlFor="photo-state">Estado</Label>
                    <Select value={photoState} onValueChange={setPhotoState}>
                      <SelectTrigger id="photo-state">
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
                  <Label htmlFor="photo-city">Cidade</Label>
                  <Select value={photoCity} onValueChange={setPhotoCity} disabled={!photoState}>
                    <SelectTrigger id="photo-city">
                      <SelectValue placeholder={photoState ? "Selecione uma cidade" : "Selecione um estado primeiro"} />
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
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="photo-description">Descrição</Label>
                  <Textarea 
                    id="photo-description" 
                    placeholder="Digite uma descrição para a foto (opcional)"
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                  />
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <FileUpload 
                      id="photo-file" 
                      label="Foto principal" 
                      accept="image/jpeg,image/png,image/jpg" 
                      onChange={setPhotoFile}
                      value={photoFile}
                    />
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="photo-active" checked={isActive} onCheckedChange={setIsActive} />
                    <Label htmlFor="photo-active">Ativa</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="photo-cover" checked={isCover} onCheckedChange={setIsCover} />
                    <Label htmlFor="photo-cover">Imagem de Capa</Label>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="button" className="bg-[#00B4D8] hover:bg-[#0095b3]" onClick={handleAddPhoto}>
                  Salvar Foto
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => {
            const category = categories.find(c => c.id === photo.category);
            
            return (
              <div key={photo.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                    {/* Substituir por uma imagem real quando disponível */}
                    <span className="text-gray-500">Imagem</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <Badge className={category?.color}>{category?.name}</Badge>
                    {photo.isCover && <Badge className="bg-[#FF6B6B]">Capa</Badge>}
                  </div>
                  <h3 className="font-medium mt-2">{photo.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{photo.city}, {photo.state}</p>
                  <p className="text-sm mt-2">{photo.description}</p>
                  
                  <div className="flex items-center mt-4 pt-2 border-t">
                    <Badge variant="outline" className={`mr-2 ${photo.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {photo.active ? <Eye size={14} className="mr-1" /> : <EyeOff size={14} className="mr-1" />}
                      {photo.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                    <div className="ml-auto flex gap-1">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 bg-white border rounded-lg">
            <p className="text-gray-500">Nenhuma foto encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPhotos;
