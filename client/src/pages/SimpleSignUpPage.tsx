import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import "../styles/auth.css";

export default function SimpleSignUpPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }
    
    console.log("Signup attempt:", formData);
    
    // For now, just navigate to home page after "signup"
    alert("Account created successfully!");
    setLocation("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
    setLocation("/");
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
        <form className="signup-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="signup-input"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          
          <Input
            type="tel"
            name="phone"
            placeholder="Phone number (optional)"
            className="signup-input"
            value={formData.phone}
            onChange={handleInputChange}
          />
          
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-input"
            value={formData.email}
            onChange={handleInputChange}
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
              required
            />
            <span 
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <Button type="submit" className="signup-button">
            SIGN UP
          </Button>

          <div className="social-icons">
            <button 
              type="button"
              className="social-icon google" 
              title="Google"
              onClick={() => handleSocialSignup('Google')}
            />
            <button 
              type="button"
              className="social-icon apple" 
              title="Apple"
              onClick={() => handleSocialSignup('Apple')}
            />
            <button 
              type="button"
              className="social-icon facebook" 
              title="Facebook"
              onClick={() => handleSocialSignup('Facebook')}
            />
          </div>

          <div className="signup-row">
            Already have an account?{" "}
            <button
              type="button"
              className="switch-link"
              onClick={() => setLocation("/login")}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}