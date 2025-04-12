
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Map, Video, Image, Compass, Globe, LogOut, 
  Menu, X, Users, Settings, MapPin 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminLocations from './AdminLocations';
import AdminVideos from './AdminVideos';
import AdminPhotos from './AdminPhotos';
import AdminPanoramaPhotos from './AdminPanoramaPhotos';
import AdminUsers from './AdminUsers';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminDashboardProps {
  currentUser: User | null;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('locations');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  const menuItems = [
    { id: 'locations', label: 'Localizações', icon: <MapPin size={20} /> },
    { id: 'videos', label: 'Vídeos', icon: <Video size={20} /> },
    { id: 'photos', label: 'Fotos', icon: <Image size={20} /> },
    { id: 'panoramas', label: 'Fotos 360°', icon: <Compass size={20} /> },
    { id: 'users', label: 'Administradores', icon: <Users size={20} /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'locations':
        return <AdminLocations />;
      case 'videos':
        return <AdminVideos />;
      case 'photos':
        return <AdminPhotos />;
      case 'panoramas':
        return <AdminPanoramaPhotos />;
      case 'users':
        return <AdminUsers />;
      default:
        return <AdminLocations />;
    }
  };

  return (
    <div className="flex h-screen bg-gelo">
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#003049] text-white">
        <div className="p-4 border-b border-[#004060]">
          <h2 className="text-xl font-bold">Turum Brasil</h2>
          <p className="text-sm text-gray-300">Painel Administrativo</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#00B4D8] text-white'
                      : 'hover:bg-[#004060]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-[#004060]">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-[#00B4D8] flex items-center justify-center mr-2">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-300 truncate">{currentUser?.email}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 text-white border-white hover:bg-[#004060]"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Sair</span>
          </Button>
          
          <div className="mt-4 text-xs text-center text-gray-400">
            <Link to="/" className="hover:text-[#00B4D8]">
              Voltar para o site
            </Link>
          </div>
        </div>
      </aside>

      {/* Menu mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="fixed top-4 left-4 z-40 p-2">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#003049] text-white w-64 p-0">
            <div className="p-4 border-b border-[#004060]">
              <h2 className="text-xl font-bold">Turum Brasil</h2>
              <p className="text-sm text-gray-300">Painel Administrativo</p>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#00B4D8] text-white'
                          : 'hover:bg-[#004060]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-[#004060]">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#00B4D8] flex items-center justify-center mr-2">
                  {currentUser?.name?.charAt(0) || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{currentUser?.name}</p>
                  <p className="text-xs text-gray-300 truncate">{currentUser?.email}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 text-white border-white hover:bg-[#004060]"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Sair</span>
              </Button>
              
              <div className="mt-4 text-xs text-center text-gray-400">
                <Link to="/" className="hover:text-[#00B4D8]">
                  Voltar para o site
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#003049]">
              {menuItems.find(item => item.id === activeSection)?.label || 'Painel'}
            </h1>
          </header>
          
          <div className="bg-white rounded-lg shadow p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
