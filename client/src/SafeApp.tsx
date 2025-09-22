import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthenticatedRoute, UnauthenticatedRoute } from "@/components/ProtectedRoute";

// Lazy load components to catch import errors
const Home = React.lazy(() => import("@/pages/home"));
const LoginPage = React.lazy(() => import("@/pages/login"));
const SignUpPage = React.lazy(() => import("@/pages/signup"));
const UserProfile = React.lazy(() => import("@/pages/user"));
const NotFound = React.lazy(() => import("@/pages/not-found"));

// Loading component
function LoadingSpinner() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      fontSize: '18px'
    }}>
      Loading...
    </div>
  );
}

// Error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error?: Error}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
          <AuthenticatedRoute>
            <UserProfile />
          </AuthenticatedRoute>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function SafeApp() {
  console.log("SafeApp is loading...");
  
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default SafeApp;