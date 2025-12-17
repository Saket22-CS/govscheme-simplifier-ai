export type Language = 'English' | 'Hindi' | 'Hinglish';

export interface SchemeResponse {
  rawText: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SuggestionChip {
  label: string;
  icon: string;
  query: string;
}