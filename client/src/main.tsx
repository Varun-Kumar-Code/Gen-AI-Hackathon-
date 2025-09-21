import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import "./index.css";

// Import your original beautiful pages
import Home from "@/pages/home";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/signup";
import UserProfile from "@/pages/user";
import Favorites from "@/pages/favorites";
import Categories from "@/pages/categories";
import Cart from "@/pages/cart";
import Product from "@/pages/product";
import NotFound from "@/pages/not-found";
import { ProtectedRoute, UnauthenticatedRoute } from "@/components/ProtectedRoute";

// Router with Firebase authentication and route protection
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login">
        <UnauthenticatedRoute>
          <LoginPage />
        </UnauthenticatedRoute>
      </Route>
      <Route path="/signup">
        <UnauthenticatedRoute>
          <SignUpPage />
        </UnauthenticatedRoute>
      </Route>
      <Route path="/user">
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      </Route>
      <Route path="/favorites">
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      </Route>
      <Route path="/cart">
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      </Route>
      <Route path="/categories" component={Categories} />
      <Route path="/product/:id" component={Product} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

// Safe app initialization with error boundaries
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found!");
  }
  
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log("🎉 Your beautiful project with Firebase authentication is now running!");
} catch (error) {
  console.error("Error loading project:", error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial; text-align: center;">
      <h1>Error Loading Project</h1>
      <p>${error instanceof Error ? error.message : String(error)}</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px; font-size: 16px;">Reload</button>
    </div>
  `;
}
