import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = "/login" 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If authentication is required but user is not logged in, redirect
  if (requireAuth && !user) {
    setLocation(redirectTo);
    return null;
  }

  // If authentication is not required but user is logged in, redirect to home
  if (!requireAuth && user) {
    setLocation("/");
    return null;
  }

  return <>{children}</>;
}

// Convenience components for common use cases
export function AuthenticatedRoute({ children }: { children: ReactNode }) {
  return <ProtectedRoute requireAuth={true}>{children}</ProtectedRoute>;
}

export function UnauthenticatedRoute({ children }: { children: ReactNode }) {
  return <ProtectedRoute requireAuth={false}>{children}</ProtectedRoute>;
}