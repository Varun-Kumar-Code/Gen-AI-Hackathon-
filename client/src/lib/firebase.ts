import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Safe Firebase initialization with complete setup
let app: any;
let auth: any;
let db: any;
let realtimeDb: any;
let analytics: any;
let googleAuthProvider: any;

try {
  // Initialize Firebase with the perfect configuration
  app = initializeApp(firebaseConfig);
  
  // Initialize all Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  realtimeDb = getDatabase(app);
  googleAuthProvider = new GoogleAuthProvider();
  
  // Configure Google Auth Provider with proper scopes
  googleAuthProvider.addScope('email');
  googleAuthProvider.addScope('profile');
  
  // Force account selection prompt
  googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  // Analytics initialization (only in production and browser)
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (analyticsError) {
      console.warn("Firebase Analytics could not be initialized:", analyticsError);
      analytics = null;
    }
  }
  
  console.log("✅ Firebase initialized successfully with perfect configuration");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
  
  // Fallback objects to prevent crashes
  auth = {
    currentUser: null,
    signOut: () => Promise.resolve(),
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.reject(new Error("Firebase not available")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Firebase not available")),
    signInWithPopup: () => Promise.reject(new Error("Firebase not available"))
  };
  
  db = {
    doc: () => ({}),
    collection: () => ({}),
    setDoc: () => Promise.resolve(),
    getDoc: () => Promise.resolve({ exists: () => false, data: () => ({}) })
  };
  
  realtimeDb = null;
  googleAuthProvider = {
    addScope: () => {},
    setCustomParameters: () => {}
  };
  
  analytics = null;
  app = null;
}

// Export a debug helper to inspect the config safely
export function firebaseConfigDebug() {
  return {
    apiKey: firebaseConfig.apiKey ? 'SET' : 'MISSING',
    authDomain: firebaseConfig.authDomain || 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING',
    databaseURL: firebaseConfig.databaseURL || 'MISSING',
    appId: firebaseConfig.appId ? 'SET' : 'MISSING',
  };
}

export { app, auth, db, realtimeDb, analytics, googleAuthProvider };
