
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StateSelectorProps {
  selectedState: string;
  onChange: (state: string) => void;
}

// Lista de estados brasileiros
const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

const StateSelector: React.FC<StateSelectorProps> = ({ selectedState, onChange }) => {
  return (
    <Select value={selectedState} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white border border-gray-300 shadow-sm focus:ring-turquesa focus:border-turquesa">
        <SelectValue placeholder="Selecione um estado" />
      </SelectTrigger>
      <SelectContent className="bg-white z-50">
        {brazilianStates.map((state) => (
          <SelectItem key={state.value} value={state.value} className="cursor-pointer">
            {state.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StateSelector;
