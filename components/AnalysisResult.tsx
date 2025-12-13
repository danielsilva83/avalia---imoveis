import React, { useState } from 'react';
import { AnalysisResponse } from '../types';
import { Share2, Copy, BrainCircuit, ArrowLeft, MessageSquareQuote } from 'lucide-react';

interface AnalysisResultProps {
  data: AnalysisResponse;
  onReset: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, onReset }) => {
  const [copiedCrm, setCopiedCrm] = useState(false);

  // Helper to format text for WhatsApp
  const generateWhatsAppText = () => {
    const text = `*AvalIA AI - Análise de Mercado* 📊\n\n` +
      `*Análise:*\n${data.priceAnalysis}\n\n` +
      `*Recomendação para Conversa:*\n"${data.salesScripts[0]}"\n\n` +
      `_Gerado por AvaliAI Inteligência de mercado_`;
    return encodeURIComponent(text);
  };

  const copyCrmData = () => {
    const jsonString = JSON.stringify(data.crmData, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedCrm(true);
    setTimeout(() => setCopiedCrm(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 pb-24">
      {/* Header with Back Button */}
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={onReset}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Resultado da Análise</h2>
      </div>

      {/* SECTION 1: Análise de Preço */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3">
          <h3 className="text-white font-semibold flex items-center gap-2">
            📊 Análise de Preço
          </h3>
        </div>
        <div className="p-6 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {data.priceAnalysis}
        </div>
      </div>

      {/* SECTION 2: Argumentos (Scripts) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
          <h3 className="text-gray-800 font-semibold flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-blue-600" />
            O que dizer ao Proprietário
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {data.salesScripts.map((script, idx) => (
            <div key={idx} className="relative bg-blue-50 p-4 rounded-lg rounded-tl-none border border-blue-100">
              <p className="text-blue-900 text-sm italic font-medium">"{script}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Pílula de Conhecimento */}
      <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <BrainCircuit className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-yellow-800 mb-1">Pílula de Conhecimento</h4>
            <p className="text-yellow-800 text-sm leading-snug">
              {data.knowledgePill}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Bar (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50 flex justify-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-md flex gap-3">
          <a 
            href={`https://wa.me/?text=${generateWhatsAppText()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            WhatsApp
          </a>
          
          <button
            onClick={copyCrmData}
            className={`flex-1 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all border ${
              copiedCrm 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Copy className="w-5 h-5" />
            {copiedCrm ? 'Copiado!' : 'CRM Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;