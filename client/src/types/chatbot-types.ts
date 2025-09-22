// Enhanced types for Jharkhand Tourism AI Assistant integration

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sources?: { uri: string; title: string }[];
  feature?: Feature;
}

export enum Feature {
  LOCATION = 'LOCATION',
  ITINERARY = 'ITINERARY', 
  SOUVENIR = 'SOUVENIR',
  LANGUAGE = 'LANGUAGE',
  GENERAL = 'GENERAL'
}

export type Language = 'en' | 'hi' | 'bn' | 'mr' | 'te' | 'ta';

export const Languages: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'हिन्दी' }, // Hindi
    { id: 'bn', name: 'বাংলা' }, // Bengali  
    { id: 'mr', name: 'मराठी' }, // Marathi
    { id: 'te', name: 'తెలుగు' }, // Telugu
    { id: 'ta', name: 'தமிழ்' }, // Tamil
];

export interface Souvenir {
    name: string;
    description: string;
    image: string;
}

export interface SouvenirCategory {
    [key: string]: Souvenir[];
}

// Legacy interface for backward compatibility
export interface LegacyMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}