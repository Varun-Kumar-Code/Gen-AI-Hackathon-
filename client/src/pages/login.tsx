import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signInWithEmail, signInWithGoogle, AuthError, resetPassword } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import "../styles/auth.css";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmail(formData);
      // User will be automatically redirected via auth state change
      setLocation("/");
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
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

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
        setError("Failed to sign in with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'Google') {
      handleGoogleLogin();
    } else {
      // For other providers, show not implemented message
      setError(`${provider} login is not yet implemented.`);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resetPassword(formData.email);
      setError(null);
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.style.cssText = `
        color: #16a34a;
        backgroundColor: #f0fdf4;
        border: 1px solid #bbf7d0;
        borderRadius: 6px;
        padding: 12px;
        marginBottom: 16px;
        fontSize: 14px;
      `;
      successDiv.textContent = 'Password reset email sent! Please check your inbox.';
      
      const errorDiv = document.querySelector('.error-message');
      if (errorDiv?.parentNode) {
        errorDiv.parentNode.insertBefore(successDiv, errorDiv);
        setTimeout(() => successDiv.remove(), 5000);
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      {/* Natural Video Background */}
      <video 
        className="background-video" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source 
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" 
          type="video/mp4" 
        />
        <source 
          src="https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_25fps.mp4" 
          type="video/mp4" 
        />
      </video>
      
      <div className="login-glass">
        <h2>Welcome back!</h2>
        
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

        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          
          <div className="password-row">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="login-input"
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

          <button
            type="button"
            className="forgot-link"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            FORGOT PASSWORD?
          </button>

          <Button 
            type="submit" 
            className="login-button"
            disabled={loading || !formData.email || !formData.password}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'LOG IN'
            )}
          </Button>
        </form>

        <div className="divider">or sign in with</div>
        <div className="social-icons">
          <button 
            type="button"
            className="social-icon google" 
            title="Google"
            onClick={() => handleSocialLogin('Google')}
            disabled={loading}
          />
          <button 
            type="button"
            className="social-icon apple" 
            title="Apple"
            onClick={() => handleSocialLogin('Apple')}
            disabled={loading}
          />
          <button 
            type="button"
            className="social-icon facebook" 
            title="Facebook"
            onClick={() => handleSocialLogin('Facebook')}
            disabled={loading}
          />
        </div>

        <div className="signup-row">
          Don't have an account?{" "}
          <button
            type="button"
            className="signup-link"
            onClick={() => setLocation("/signup")}
            disabled={loading}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}