export interface PropertyFormData {
  transactionType: 'venda' | 'aluguel';
  type: string;
  location: string;
  size: number;
  rooms: number;
  condition: string;
  price: number;
  // New attributes
  garage: number;
  suites: number;
  isFurnished: boolean;
  isCondo: boolean;
  hasBackyard: boolean;
  hasPool: boolean;
  hasGarden: boolean;
  hasAirConditioning: boolean;
}

export interface CrmData {
  resumo_imovel: string;
  faixa_preco_sugerida: string;
  nivel_dificuldade_venda: string;
  tags_sugeridas: string[];
}

export interface AnalysisResponse {
  priceAnalysis: string; // Section 1: Markdown
  salesScripts: string[]; // Section 2: Array of strings
  knowledgePill: string; // Section 3: Concept
  crmData: CrmData; // Section 4: JSON Data
}

export enum AppState {
  FORM = 'FORM',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}