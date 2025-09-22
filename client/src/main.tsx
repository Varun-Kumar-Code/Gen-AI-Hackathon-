import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import App from "./App";
import "./index.css";

function Main() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <App />
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
  root.render(<Main />);
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
