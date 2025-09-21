import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Perfect Firebase configuration from Firebase - Auth folder
const firebaseConfig = {
  apiKey: "AIzaSyCNKRHAHaWS806hqnxlPZ2ZGyqfuTjr7qk",
  authDomain: "genai-973e8.firebaseapp.com",
  databaseURL: "https://genai-973e8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "genai-973e8",
  storageBucket: "genai-973e8.firebasestorage.app",
  messagingSenderId: "775058576088",
  appId: "1:775058576088:web:67e1008f8134f479c3fdad",
  measurementId: "G-X2DX6W8R1S"
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
  
  // Analytics initialization (only in production and browser)
  if (typeof window !== 'undefined' && import.meta.env.PROD) {
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