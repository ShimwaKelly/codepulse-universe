
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Code, Heart, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const { isKidsMode } = useTheme();
  
  return (
    <footer className={`mt-auto py-8 border-t ${isKidsMode ? 'bg-white border-t-4 border-kids-primary' : 'border-border bg-background'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Code size={24} className={isKidsMode ? "text-kids-primary" : ""} />
              <span className={`font-bold text-lg ${isKidsMode ? "text-kids-primary" : ""}`}>
                CodePulse Rwanda
              </span>
            </Link>
            <p className={`text-sm ${isKidsMode ? "text-kids-foreground" : "text-muted-foreground"}`}>
              Empowering Rwandan youth with coding skills for the future.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className={`font-semibold mb-2 ${isKidsMode ? "text-kids-primary text-lg" : ""}`}>Learn</h3>
            <Link to="/courses" className={`text-sm hover:underline ${isKidsMode ? "text-kids-foreground text-base" : ""}`}>Courses</Link>
            <Link to="/leaderboard" className={`text-sm hover:underline ${isKidsMode ? "text-kids-foreground text-base" : ""}`}>Leaderboard</Link>
            <Link to="/feed" className={`text-sm hover:underline ${isKidsMode ? "text-kids-foreground text-base" : ""}`}>Feed</Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className={`font-semibold mb-2 ${isKidsMode ? "text-kids-primary text-lg" : ""}`}>Account</h3>
            <Link to="/login" className={`text-sm hover:underline ${isKidsMode ? "text-kids-foreground text-base" : ""}`}>Login</Link>
            <Link to="/signup" className={`text-sm hover:underline ${isKidsMode ? "text-kids-foreground text-base" : ""}`}>Sign Up</Link>
            <Link to="/profile" className={`text-sm hover:underline ${isKidsMode ? "text-kids-foreground text-base" : ""}`}>Profile</Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className={`font-semibold mb-2 ${isKidsMode ? "text-kids-primary text-lg" : ""}`}>Connect</h3>
            <div className="flex gap-4 mt-2">
              <a href="#" className={`hover:scale-110 transition-transform ${isKidsMode ? "text-kids-primary" : ""}`}>
                <Twitter size={20} />
              </a>
              <a href="#" className={`hover:scale-110 transition-transform ${isKidsMode ? "text-kids-primary" : ""}`}>
                <Facebook size={20} />
              </a>
              <a href="#" className={`hover:scale-110 transition-transform ${isKidsMode ? "text-kids-primary" : ""}`}>
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-4 border-t ${isKidsMode ? "border-kids-muted" : "border-border"} flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={`text-sm ${isKidsMode ? "text-kids-foreground" : "text-muted-foreground"}`}>
            © {new Date().getFullYear()} CodePulse Rwanda. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className={`text-xs hover:underline ${isKidsMode ? "text-kids-foreground" : "text-muted-foreground"}`}>Privacy Policy</Link>
            <Link to="#" className={`text-xs hover:underline ${isKidsMode ? "text-kids-foreground" : "text-muted-foreground"}`}>Terms of Service</Link>
            <span className={`text-xs flex items-center gap-1 ${isKidsMode ? "text-kids-foreground" : "text-muted-foreground"}`}>
              Made with <Heart size={12} className={isKidsMode ? "text-kids-primary" : "text-primary"} /> in Rwanda
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
