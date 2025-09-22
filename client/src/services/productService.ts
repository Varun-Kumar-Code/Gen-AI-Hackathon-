import type { Product } from "@/types/types";

// Helper functions for localStorage
const FAVORITES_KEY = 'artizone-favorites';

const getFavoritesFromStorage = (): Set<string> => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return new Set(favorites ? JSON.parse(favorites) : []);
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return new Set();
  }
};

const saveFavoritesToStorage = (favorites: Set<string>): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const productService = {
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const response = await fetch('/data/products.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products: Product[] = await response.json();
      const favorites = getFavoritesFromStorage();
      
      // Add favorite status from localStorage
      const productsWithFavorites = products.map(product => ({
        ...product,
        isFavorite: favorites.has(product.id)
      }));
      
      if (category && category !== 'All') {
        return productsWithFavorites.filter(product => 
          product.category?.toLowerCase() === category.toLowerCase()
        );
      }
      
      return productsWithFavorites;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === id) || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async toggleFavorite(productId: string): Promise<boolean> {
    try {
      const favorites = getFavoritesFromStorage();
      
      if (favorites.has(productId)) {
        favorites.delete(productId);
      } else {
        favorites.add(productId);
      }
      
      saveFavoritesToStorage(favorites);
      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  },

  async getFavorites(): Promise<Product[]> {
    try {
      const allProducts = await this.getProducts();
      const favorites = getFavoritesFromStorage();
      return allProducts.filter(product => favorites.has(product.id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  }
};