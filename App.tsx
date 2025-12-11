import React, { useState } from 'react';
import PropertyForm from './components/PropertyForm';
import AnalysisResult from './components/AnalysisResult';
import { analyzeProperty } from './services/geminiService';
import { PropertyFormData, AnalysisResponse, AppState } from './types';
import { LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.FORM);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: PropertyFormData) => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const response = await analyzeProperty(data);
      setResult(response);
      setAppState(AppState.RESULT);
    } catch (err: any) {
      console.error(err);
      setError("Ocorreu um erro ao analisar o imóvel. Verifique sua conexão ou a chave de API.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setAppState(AppState.FORM);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-900">
            <LayoutDashboard className="w-6 h-6" />
            <h1 className="text-xl font-extrabold tracking-tight">AvalIA - Imóveis</h1>
          </div>
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">BETA</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        
        {appState === AppState.FORM && (
          <div className="animate-fade-in-up">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Assistente de avaliação de preços de imóveis</h2>
              <p className="text-gray-500 mt-2">Inteligência de mercado em tempo real para precificar na medida certa.</p>
            </div>
            <PropertyForm onSubmit={handleFormSubmit} isLoading={false} />
          </div>
        )}

        {appState === AppState.LOADING && (
           <div className="flex flex-col items-center justify-center pt-20 animate-pulse space-y-4">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <h3 className="text-lg font-medium text-gray-600">Consultando bases de dados...</h3>
              <p className="text-sm text-gray-400 text-center max-w-xs">
                O AvalIA está comparando o imóvel com ofertas no VivaReal, Zap e OLX.
              </p>
           </div>
        )}

        {appState === AppState.RESULT && result && (
          <div className="animate-fade-in">
            <AnalysisResult data={result} onReset={resetApp} />
          </div>
        )}

        {appState === AppState.ERROR && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-4">
            <div className="text-red-500 text-5xl mb-2">⚠️</div>
            <h3 className="text-red-800 font-bold text-lg">Erro na Análise</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={resetApp}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;