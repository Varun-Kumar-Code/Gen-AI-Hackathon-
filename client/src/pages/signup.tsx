import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signUpWithEmail, signInWithGoogle, AuthError } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import "../styles/auth.css";

export default function SignUpPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return null;
  }

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }
    if (!formData.password) {
      return "Please enter a password.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords don't match!";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signUpWithEmail({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone
      });
      
      setSuccess("Account created successfully! Please check your email to verify your account before signing in.");
      
      // Automatically redirect to login after successful signup
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
      
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signInWithGoogle();
      setLocation("/");
    } catch (err) {
      if (err instanceof AuthError) {
        // Don't show error for user cancellation
        if (!err.message.includes('cancelled')) {
          setError(err.message);
        }
      } else {
        setError("Failed to sign up with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    if (provider === 'Google') {
      handleGoogleSignup();
    } else {
      // For other providers, show not implemented message
      setError(`${provider} signup is not yet implemented.`);
    }
  };

  return (
    <div className="signup-background">
      {/* Natural Video Background */}
      <video 
        className="background-video" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source 
          src="https://cdn.pixabay.com/video/2023/11/19/189813-887078786_tiny.mp4" 
          type="video/mp4" 
        />
        <source 
          src="https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_25fps.mp4" 
          type="video/mp4" 
        />
      </video>
      
      <div className="signup-glass">
        <h2>Create an account</h2>
        
        {error && (
          <div className="error-message" style={{
            color: '#ef4444',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" style={{
            color: '#16a34a',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="signup-input"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          
          <Input
            type="tel"
            name="phone"
            placeholder="Phone number (optional)"
            className="signup-input"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={loading}
          />
          
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-input"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            required
          />

          <div className="password-row">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min. 6 characters)"
              className="signup-input"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
              required
            />
            <span 
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="password-row">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="signup-input"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
              required
            />
            <span 
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <Button 
            type="submit" 
            className="signup-button"
            disabled={loading || !formData.fullName || !formData.email || !formData.password || !formData.confirmPassword}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              'SIGN UP'
            )}
          </Button>

          <div className="social-icons">
            <button 
              type="button"
              className="social-icon google" 
              title="Google"
              onClick={() => handleSocialSignup('Google')}
              disabled={loading}
            />
            <button 
              type="button"
              className="social-icon apple" 
              title="Apple"
              onClick={() => handleSocialSignup('Apple')}
              disabled={loading}
            />
            <button 
              type="button"
              className="social-icon facebook" 
              title="Facebook"
              onClick={() => handleSocialSignup('Facebook')}
              disabled={loading}
            />
          </div>

          <div className="signup-row">
            Already have an account?{" "}
            <button
              type="button"
              className="switch-link"
              onClick={() => setLocation("/login")}
              disabled={loading}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}