const express = require('express');
const path = require('path');
const fs = require('fs');

// In-memory storage (similar to your original MemStorage)
class MemStorage {
  constructor() {
    this.products = new Map();
    this.seedProducts();
  }

  seedProducts() {
    const sampleProducts = [
      {
        name: "Serum",
        description: "Lorem ipsum dolor",
        price: 1750,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false
      },
      {
        name: "Vuozi",
        description: "Lorem ipsum dolor",
        price: 3845,
        category: "Ceramic",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false
      },
      {
        name: "Lorem",
        description: "Lorem ipsum dolor",
        price: 3574,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: true
      },
      {
        name: "Bowl",
        description: "Lorem ipsum dolor",
        price: 1250,
        category: "Pottery",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: 4,
        isFavorite: false
      }
    ];

    sampleProducts.forEach((product) => {
      const id = Math.random().toString(36).substr(2, 9);
      const fullProduct = {
        ...product,
        id,
        rating: product.rating ?? 4,
        isFavorite: product.isFavorite ?? false
      };
      this.products.set(id, fullProduct);
    });
  }

  async getProducts() {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category) {
    if (category === "All") {
      return this.getProducts();
    }
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getProduct(id) {
    return this.products.get(id);
  }

  async toggleProductFavorite(id) {
    const product = this.products.get(id);
    if (product) {
      const updatedProduct = { ...product, isFavorite: !product.isFavorite };
      this.products.set(id, updatedProduct);
      return updatedProduct;
    }
    return undefined;
  }
}

const storage = new MemStorage();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const originalJson = res.json;
  let capturedResponse;

  res.json = function(body) {
    capturedResponse = body;
    return originalJson.call(this, body);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const category = req.query.category;
    const products = category 
      ? await storage.getProductsByCategory(category) 
      : await storage.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await storage.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

app.patch('/api/products/:id/favorite', async (req, res) => {
  try {
    const product = await storage.toggleProductFavorite(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Failed to toggle favorite' });
  }
});

// Serve static files from dist/public
const distPath = path.join(__dirname, '..', 'dist', 'public');
console.log('Looking for static files at:', distPath);
console.log('Static files exist:', fs.existsSync(distPath));

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  console.warn('Static files directory not found:', distPath);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  
  console.log('Serving index.html for path:', req.path);
  const indexPath = path.join(distPath, 'index.html');
  console.log('Index path:', indexPath);
  console.log('Index exists:', fs.existsSync(indexPath));
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at:', indexPath);
    // Try to list directory contents for debugging
    try {
      const files = fs.readdirSync(path.dirname(indexPath));
      console.log('Files in dist directory:', files);
    } catch (e) {
      console.log('Cannot read dist directory:', e.message);
    }
    res.status(404).json({ message: 'Application not found. Please build the client first.' });
  }
});

module.exports = app;