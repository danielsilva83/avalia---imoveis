import React, { useState } from 'react';
import { PropertyFormData } from '../types';
import {
  Building2, MapPin, Ruler, BedDouble, CheckCircle2, DollarSign,
  KeyRound, Tag, Car, Bath, Trees, Waves, Wind, Armchair, Home
} from 'lucide-react';

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  isLoading: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    transactionType: 'venda',
    type: 'Apartamento',
    location: '',
    size: 0,
    rooms: 0,
    condition: 'Reformado',
    price: 0,
    // New fields defaults
    garage: 0,
    suites: 0,
    isFurnished: false,
    isCondo: false,
    hasBackyard: false,
    hasPool: false,
    hasGarden: false,
    hasAirConditioning: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'size' || name === 'rooms' || name === 'price' || name === 'garage' || name === 'suites'
          ? Number(value)
          : value,
      }));
    }
  };

  const setTransactionType = (type: 'venda' | 'aluguel') => {
    setFormData(prev => ({ ...prev, transactionType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-blue-900 p-6 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Nova Análise
        </h2>
        <p className="text-blue-200 text-sm mt-1">Insira os dados para consultoria em tempo real.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">

        {/* Transaction Type Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setTransactionType('venda')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${formData.transactionType === 'venda'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Tag className="w-4 h-4" /> Venda
          </button>
          <button
            type="button"
            onClick={() => setTransactionType('aluguel')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${formData.transactionType === 'aluguel'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <KeyRound className="w-4 h-4" /> Locação
          </button>
        </div>

        {/* Tipo de Imóvel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Imóvel</label>
          <div className="relative">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
            >
              <option>Apartamento</option>
              <option>Casa</option>
              <option>Studio</option>
              <option>Cobertura</option>
              <option>Comercial</option>
              <option>Galpão</option>
              <option>Terreno</option>
            </select>
            <div className="absolute right-3 top-3 pointer-events-none">
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Localização */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rua ou Bairro, Cidade, UF</label>
          <div className="relative">
            <input
              type="text"
              name="location"
              placeholder="Ex: rua, bairro, cidade, UF)"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Características Básicas (Grid 2x2) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Metragem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
            <div className="relative">
              <input
                type="number"
                name="size"
                required
                min="10"
                value={formData.size || ''}
                onChange={handleChange}
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Ruler className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Quartos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quartos</label>
            <div className="relative">
              <input
                type="number"
                name="rooms"
                required
                min="0"
                value={formData.rooms}
                onChange={handleChange}
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <BedDouble className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Suítes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Suítes</label>
            <div className="relative">
              <input
                type="number"
                name="suites"
                required
                min="0"
                value={formData.suites}
                onChange={handleChange}
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Bath className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Vagas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vagas</label>
            <div className="relative">
              <input
                type="number"
                name="garage"
                required
                min="0"
                value={formData.garage}
                onChange={handleChange}
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Car className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado de Conservação</label>
          <div className="relative">
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              <option>Novo / Contra-piso</option>
              <option>Reformado</option>
              <option>Padrão Original (Bom)</option>
              <option>Precisa de Reforma</option>
              <option>Na Planta</option>
            </select>
            <div className="absolute right-3 top-3 pointer-events-none">
              <CheckCircle2 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Comodidades (Checkboxes) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="isCondo" checked={formData.isCondo} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
              <Home className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Em Condomínio</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="isFurnished" checked={formData.isFurnished} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
              <Armchair className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Mobiliado</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="hasPool" checked={formData.hasPool} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
              <Waves className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Piscina</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="hasBackyard" checked={formData.hasBackyard} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
              <Trees className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Quintal</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="hasGarden" checked={formData.hasGarden} onChange={handleChange} className="w-4 h-4 text-green-600 rounded" />
              <span className="text-sm text-gray-700">Jardim</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="hasAirConditioning" checked={formData.hasAirConditioning} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
              <Wind className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Ar Cond.</span>
            </label>
          </div>
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formData.transactionType === 'venda' ? 'Preço de Venda (R$)' : 'Aluguel Mensal (R$)'}
          </label>
          <div className="relative">
            <input
              type="number"
              name="price"
              required
              min="0"
              placeholder="0,00"
              value={formData.price || ''}
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-800"
            />
            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-green-600" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-2 py-4 rounded-lg font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analisando {formData.transactionType === 'venda' ? 'Venda' : 'Locação'}...
            </span>
          ) : (
            'Gerar Consultoria'
          )}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;