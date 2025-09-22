import { PlaceInfo } from '../types/types';

export const places: PlaceInfo[] = [
  {
    id: '1',
    name: 'Hundru Falls',
    type: 'VIEWPOINT',
    location: { lat: 23.4274, lng: 85.5857 },
    description: 'A spectacular waterfall with a height of 98 meters.',
    hasStreetView: false,
    rating: 4.6,
    address: 'Hundru, Ranchi District, Jharkhand'
  },
  {
    id: '2',
    name: 'Pahari Mandir',
    type: 'MONUMENT',
    location: { lat: 23.3706, lng: 85.3316 },
    description: 'An ancient temple atop a hill offering panoramic views of Ranchi.',
    hasStreetView: true,
    rating: 4.5,
    address: 'Hill Road, Ranchi, Jharkhand'
  },
  {
    id: '3',
    name: 'Tribal Museum',
    type: 'MONUMENT',
    location: { lat: 23.3629, lng: 85.3284 },
    description: 'Museum showcasing tribal culture and heritage of Jharkhand.',
    hasStreetView: true,
    rating: 4.3,
    address: 'Morabadi, Ranchi, Jharkhand'
  },
  {
    id: '4',
    name: 'Ranchi Lake',
    type: 'LAKE',
    location: { lat: 23.3558, lng: 85.3249 },
    description: 'An artificial lake built by British colonial officials.',
    hasStreetView: true,
    rating: 4.0,
    address: 'Ranchi Lake Area, Ranchi, Jharkhand'
  },
  {
    id: '5',
    name: 'JD Hi Street Mall',
    type: 'MALL',
    location: { lat: 23.3642, lng: 85.3292 },
    description: 'Modern shopping mall with various retail outlets and entertainment.',
    hasStreetView: true,
    rating: 4.2,
    address: 'Main Road, Ranchi, Jharkhand'
  },
  {
    id: '6',
    name: 'The Yellow Chilli',
    type: 'RESTAURANT',
    location: { lat: 23.3645, lng: 85.3298 },
    description: 'Popular restaurant serving Indian cuisine.',
    hasStreetView: true,
    rating: 4.4,
    address: 'Nucleus Mall, Ranchi, Jharkhand'
  },
  {
    id: '7',
    name: 'Capitol Hill Hotel',
    type: 'HOTEL',
    location: { lat: 23.3632, lng: 85.3289 },
    description: 'Luxury hotel in the heart of Ranchi.',
    hasStreetView: true,
    rating: 4.5,
    address: 'Main Road, Ranchi, Jharkhand'
  },
  {
    id: '8',
    name: 'Tribal Handicraft Market',
    type: 'ARTISAN_MARKET',
    location: { lat: 23.3626, lng: 85.3277 },
    description: 'Traditional market featuring local tribal arts and crafts.',
    hasStreetView: true,
    rating: 4.1,
    address: 'Kalyan Nagar, Ranchi, Jharkhand'
  }
];