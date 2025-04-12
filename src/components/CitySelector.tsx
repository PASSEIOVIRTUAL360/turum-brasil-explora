
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CitySelectorProps {
  selectedCity: string;
  onChange: (city: string) => void;
  selectedState: string;
  disabled: boolean;
}

// Mock para demonstração - em produção isso seria substituído por uma API
const citiesByState: Record<string, { value: string; label: string }[]> = {
  "SC": [
    { value: "florianopolis", label: "Florianópolis" },
    { value: "blumenau", label: "Blumenau" },
    { value: "balneario-camboriu", label: "Balneário Camboriú" },
    { value: "joinville", label: "Joinville" },
  ],
  "RJ": [
    { value: "rio-de-janeiro", label: "Rio de Janeiro" },
    { value: "niteroi", label: "Niterói" },
    { value: "buzios", label: "Búzios" },
    { value: "paraty", label: "Paraty" },
  ],
  "SP": [
    { value: "sao-paulo", label: "São Paulo" },
    { value: "campinas", label: "Campinas" },
    { value: "santos", label: "Santos" },
    { value: "sao-sebastiao", label: "São Sebastião" },
  ],
  "BA": [
    { value: "salvador", label: "Salvador" },
    { value: "porto-seguro", label: "Porto Seguro" },
    { value: "ilheus", label: "Ilhéus" },
    { value: "praia-do-forte", label: "Praia do Forte" },
  ],
};

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onChange, selectedState, disabled }) => {
  const cities = selectedState ? (citiesByState[selectedState] || []) : [];

  return (
    <Select value={selectedCity} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full bg-white border border-gray-300 shadow-sm focus:ring-turquesa focus:border-turquesa">
        <SelectValue placeholder="Selecione uma cidade" />
      </SelectTrigger>
      <SelectContent className="bg-white z-50">
        {cities.map((city) => (
          <SelectItem key={city.value} value={city.value} className="cursor-pointer">
            {city.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CitySelector;
