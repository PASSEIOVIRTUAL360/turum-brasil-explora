
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  return (
    <header className={`w-full z-50 ${transparent ? 'bg-transparent absolute top-0' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl font-bold text-turquesa">
            <span className="text-turquesa">Tur</span>
            <span className="text-petroleo">um</span>
          </h1>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-800 hover:text-turquesa transition-colors">
            Início
          </Link>
          <Link to="/itinerary" className="text-gray-800 hover:text-turquesa transition-colors">
            Meu Roteiro
          </Link>
          <Link to="/favoritos" className="text-gray-800 hover:text-turquesa transition-colors">
            Favoritos
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="text-gray-800 hover:text-turquesa transition-colors py-2">
                Início
              </Link>
              <Link to="/itinerary" className="text-gray-800 hover:text-turquesa transition-colors py-2">
                Meu Roteiro
              </Link>
              <Link to="/favoritos" className="text-gray-800 hover:text-turquesa transition-colors py-2">
                Favoritos
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
