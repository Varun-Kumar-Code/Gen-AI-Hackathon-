import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Define the shape of user profile data
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

// Define the authentication context type
interface AuthContextType {
  // Legacy properties for backward compatibility
  isLoggedIn: boolean;
  user: User | null;
  // New Firebase-specific properties
  userProfile: UserProfile | null;
  loading: boolean;
  // Methods
  login: (userData: any) => void; // Legacy method
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Legacy state for backward compatibility
  const isLoggedIn = !!user;

  // Convert Firebase User to UserProfile
  const createUserProfile = (firebaseUser: User): UserProfile => {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      phoneNumber: firebaseUser.phoneNumber,
      emailVerified: firebaseUser.emailVerified,
      createdAt: firebaseUser.metadata.creationTime,
      lastLoginAt: firebaseUser.metadata.lastSignInTime,
    };
  };

  // Legacy login method for backward compatibility
  const login = (userData: any) => {
    // This is kept for backward compatibility but should use Firebase auth
    console.warn('Using legacy login method. Consider using Firebase authentication instead.');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      // Clear legacy localStorage as well
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Legacy logout method (calls signOut)
  const logout = signOut;

  // Refresh user data
  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const updatedProfile = createUserProfile(auth.currentUser);
      setUserProfile(updatedProfile);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const profile = createUserProfile(firebaseUser);
        setUserProfile(profile);
        // Update legacy localStorage for compatibility
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(profile));
      } else {
        setUserProfile(null);
        // Clear legacy localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
      }
      
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Check localStorage for existing auth state on mount (legacy support)
  useEffect(() => {
    if (!user && !loading) {
      const storedAuth = localStorage.getItem('isLoggedIn');
      if (storedAuth === 'true') {
        // Clear legacy storage and rely on Firebase auth state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
      }
    }
  }, [user, loading]);

  // Context value
  const value: AuthContextType = {
    isLoggedIn,
    user,
    userProfile,
    loading,
    login,
    logout,
    signOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Higher-order component for protected routes
interface RequireAuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  fallback = <div>Please sign in to access this page.</div> 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};