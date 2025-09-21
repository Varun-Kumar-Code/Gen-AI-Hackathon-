import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  toggleProductFavorite(id: string): Promise<Product | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Serum",
        description: "Lorem ipsum dolor",
        price: 1750,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Vuozi",
        description: "Lorem ipsum dolor",
        price: 3845,
        category: "Ceramic",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Lorem",
        description: "Lorem ipsum dolor",
        price: 3574,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: true,
      },
      {
        name: "Lorem",
        description: "Lorem ipsum dolor",
        price: 2499,
        category: "Ceramic",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Tiles",
        description: "Lorem ipsum dolor",
        price: 1890,
        category: "Glaze",
        imageUrl: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Bowl",
        description: "Lorem ipsum dolor",
        price: 1250,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Serum",
        description: "Lorem ipsum dolor",
        price: 1750,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Vuozi",
        description: "Lorem ipsum dolor",
        price: 3845,
        category: "Ceramic",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Lorem",
        description: "Lorem ipsum dolor",
        price: 3574,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: true,
      },
      {
        name: "Lorem",
        description: "Lorem ipsum dolor",
        price: 2499,
        category: "Ceramic",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Tiles",
        description: "Lorem ipsum dolor",
        price: 1890,
        category: "Glaze",
        imageUrl: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      },
      {
        name: "Bowl",
        description: "Lorem ipsum dolor",
        price: 1250,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false,
      }
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = { 
        ...product, 
        id,
        rating: product.rating ?? 4,
        isFavorite: product.isFavorite ?? false
      };
      this.products.set(id, fullProduct);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === "All") {
      return this.getProducts();
    }
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      rating: insertProduct.rating ?? 4,
      isFavorite: insertProduct.isFavorite ?? false
    };
    this.products.set(id, product);
    return product;
  }

  async toggleProductFavorite(id: string): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (product) {
      const updatedProduct = { ...product, isFavorite: !product.isFavorite };
      this.products.set(id, updatedProduct);
      return updatedProduct;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
