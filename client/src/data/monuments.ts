import { PlaceInfo } from '../types/types';

export const monuments: PlaceInfo[] = [
  {
    id: '1',
    name: 'Hundru Falls',
    type: 'VIEWPOINT',
    location: {
      lat: 23.4274,
      lng: 85.5914
    },
    description: 'One of the highest waterfalls in Jharkhand, falling from a height of 98 meters.',
    imageUrl: 'https://example.com/hundru-falls.jpg',
    rating: 4.6,
    address: 'Hundru, Ranchi District, Jharkhand',
    hasStreetView: false
  },
  {
    id: '2',
    name: 'Pahari Mandir',
    type: 'MONUMENT',
    location: {
      lat: 23.3828,
      lng: 85.3357
    },
    description: 'Ancient temple located on a hill offering panoramic views of Ranchi.',
    imageUrl: 'https://example.com/pahari-mandir.jpg',
    rating: 4.5,
    address: 'Hill Road, Ranchi, Jharkhand',
    hasStreetView: true
  },
  {
    id: '3',
    name: 'Jagannath Temple',
    type: 'MONUMENT',
    location: {
      lat: 23.3701,
      lng: 85.3242
    },
    description: 'Famous temple dedicated to Lord Jagannath, built in traditional Kalinga architecture style.',
    imageUrl: 'https://example.com/jagannath-temple.jpg',
    rating: 4.7,
    address: 'Main Road, Ranchi, Jharkhand',
    hasStreetView: true
  },
  {
    id: '4',
    name: 'Dassam Falls',
    type: 'VIEWPOINT',
    location: {
      lat: 23.3683,
      lng: 85.7648
    },
    description: 'Spectacular waterfall cascading down from a height of 144 feet.',
    imageUrl: 'https://example.com/dassam-falls.jpg',
    rating: 4.4,
    address: 'Taimara, Ranchi District, Jharkhand',
    hasStreetView: false
  }
];