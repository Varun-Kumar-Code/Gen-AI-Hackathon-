import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  User
} from 'firebase/auth';
import { auth, googleAuthProvider } from '@/lib/firebase';

// Types for authentication
export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Authentication error handling
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string = 'unknown',
    public originalError?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// Convert Firebase auth errors to user-friendly messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked. Please allow popups and try again.';
    case 'auth/cancelled-popup-request':
      return 'Only one popup request is allowed at a time.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// Sign up with email and password
export const signUpWithEmail = async (userData: SignUpData): Promise<User> => {
  try {
    const { email, password, fullName } = userData;
    
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    if (fullName) {
      await updateProfile(user, {
        displayName: fullName
      });
    }
    
    // Send email verification
    await sendEmailVerification(user);
    
    return user;
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new AuthError(
      getAuthErrorMessage(error.code),
      error.code,
      error
    );
  }
};

// Sign in with email and password
export const signInWithEmail = async (userData: SignInData): Promise<User> => {
  try {
    const { email, password } = userData;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new AuthError(
      getAuthErrorMessage(error.code),
      error.code,
      error
    );
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    return userCredential.user;
  } catch (error: any) {
    console.error('Google sign in error:', error);
    
    // Don't throw error if user cancelled the popup
    if (error.code === 'auth/popup-closed-by-user' || 
        error.code === 'auth/cancelled-popup-request') {
      throw new AuthError('Sign-in was cancelled.', error.code, error);
    }
    
    throw new AuthError(
      getAuthErrorMessage(error.code),
      error.code,
      error
    );
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw new AuthError(
      getAuthErrorMessage(error.code),
      error.code,
      error
    );
  }
};

// Resend email verification
export const resendEmailVerification = async (): Promise<void> => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    } else {
      throw new AuthError('No user is currently signed in.');
    }
  } catch (error: any) {
    console.error('Email verification error:', error);
    throw new AuthError(
      getAuthErrorMessage(error.code),
      error.code,
      error
    );
  }
};

// Update user profile
export const updateUserProfile = async (updates: {
  displayName?: string;
  photoURL?: string;
}): Promise<void> => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, updates);
    } else {
      throw new AuthError('No user is currently signed in.');
    }
  } catch (error: any) {
    console.error('Profile update error:', error);
    throw new AuthError(
      'Failed to update profile. Please try again.',
      error.code,
      error
    );
  }
};

// Check if email is available
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  try {
    // This is a workaround since Firebase doesn't provide a direct method
    // We'll try to create a user and catch the specific error
    await createUserWithEmailAndPassword(auth, email, 'temporary-password-check');
    return true; // Email is available (this shouldn't happen in normal flow)
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return false; // Email is not available
    }
    // For other errors, assume email is available
    return true;
  }
};

// Enhanced profile update 
export const updateUserProfileData = async (profileData: {
  fullName?: string;
  photoURL?: string;
}): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new AuthError('No user is currently logged in');
  }

  try {
    // Update Firebase Auth profile
    const updates: { displayName?: string; photoURL?: string } = {};
    if (profileData.fullName) {
      updates.displayName = profileData.fullName;
    }
    if (profileData.photoURL) {
      updates.photoURL = profileData.photoURL;
    }

    if (Object.keys(updates).length > 0) {
      await updateProfile(user, updates);
    }

    console.log('Profile updated successfully');
  } catch (error: any) {
    console.error('Profile update error:', error);
    throw new AuthError(getAuthErrorMessage(error.code));
  }
};

// Get user profile data
export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new AuthError('No user is currently logged in');
  }

  try {
    let profile = {
      uid: user.uid,
      email: user.email || '',
      fullName: user.displayName || '',
      photoURL: user.photoURL || '',
      phone: '',
      address: '',
      city: '',
      country: ''
    };

    return profile;
  } catch (error: any) {
    console.error('Get profile error:', error);
    throw new AuthError(getAuthErrorMessage(error.code));
  }
};

// Sign out user
export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
    console.log('User signed out successfully');
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new AuthError(getAuthErrorMessage(error.code));
  }
};