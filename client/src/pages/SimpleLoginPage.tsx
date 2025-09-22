import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import "../styles/auth.css";

export default function SimpleLoginPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    
    // Simple validation
    if (formData.email && formData.password) {
      // For now, just redirect to home
      setLocation("/");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    setLocation("/");
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
          src="https://cdn.pixabay.com/video/2023/05/09/162194-827962885_tiny.mp4" 
          type="video/mp4" 
        />
        <source 
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4" 
          type="video/mp4" 
        />
      </video>
      
      <div className="login-glass">
        <h2>Welcome back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={formData.email}
            onChange={handleInputChange}
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
              required
            />
            <span 
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className="forgot-password">
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="login-button">
            LOGIN
          </Button>

          <div className="social-icons">
            <button 
              type="button"
              className="social-icon google" 
              title="Google"
              onClick={() => handleSocialLogin('Google')}
            />
            <button 
              type="button"
              className="social-icon apple" 
              title="Apple"
              onClick={() => handleSocialLogin('Apple')}
            />
            <button 
              type="button"
              className="social-icon facebook" 
              title="Facebook"
              onClick={() => handleSocialLogin('Facebook')}
            />
          </div>

          <div className="signup-row">
            Don't have an account?{" "}
            <button
              type="button"
              className="switch-link"
              onClick={() => setLocation("/signup")}
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}