
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  sources?: { uri: string; title: string }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrl: string;
  category: string;
  rating: number;
  reviews?: number;
  inStock?: boolean;
  isFavorite?: boolean;
}

export enum Feature {
  LOCATION = 'LOCATION',
  ITINERARY = 'ITINERARY',
  SOUVENIR = 'SOUVENIR',
  LANGUAGE = 'LANGUAGE',
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