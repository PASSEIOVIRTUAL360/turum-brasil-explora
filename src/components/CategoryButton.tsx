
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryButtonProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  cityId: string;
  categorySlug: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  title, 
  icon, 
  color, 
  cityId,
  categorySlug 
}) => {
  return (
    <Link
      to={`/cidade/${cityId}/categoria/${categorySlug}`}
      className={cn(
        "flex flex-col items-center p-3 rounded-lg shadow-md transition-all duration-300",
        "transform hover:-translate-y-1 hover:shadow-lg",
        color
      )}
    >
      <div className="text-white text-2xl mb-2">
        {icon}
      </div>
      <span className="text-white font-medium text-center">{title}</span>
    </Link>
  );
};

export default CategoryButton;
