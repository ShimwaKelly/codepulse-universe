
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Code, 
  Music, 
  User, 
  Book, 
  Home, 
  Award, 
  MessageSquare,
  LogIn,
  UserPlus,
  Gauge
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isKidsMode } = useTheme();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 
      ${isActive(to) 
        ? (isKidsMode ? 'bg-kids-primary text-white font-bold' : 'bg-secondary text-foreground font-medium') 
        : (isKidsMode ? 'text-lg font-medium kids-text hover:bg-kids-primary/10' : 'hover:bg-secondary')}`}
      onClick={closeMenu}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );

  // Show login/signup buttons if not on login or signup pages
  const showAuthButtons = !isActive('/login') && !isActive('/signup');

  return (
    <header className={`sticky top-0 z-50 ${isKidsMode ? 'bg-white border-b-4 border-kids-primary' : 'bg-background/80 backdrop-blur-md border-b border-border'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Code size={32} className={isKidsMode ? "text-kids-primary" : ""} />
          <span className={`font-bold text-xl tracking-tight ${isKidsMode ? "text-kids-primary text-2xl" : ""}`}>
            CodePulse Rwanda
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-2">
            <NavLink to="/" icon={<Home size={isKidsMode ? 20 : 18} />}>Home</NavLink>
            <NavLink to="/dashboard" icon={<Gauge size={isKidsMode ? 20 : 18} />}>Dashboard</NavLink>
            <NavLink to="/courses" icon={<Book size={isKidsMode ? 20 : 18} />}>Courses</NavLink>
            <NavLink to="/leaderboard" icon={<Award size={isKidsMode ? 20 : 18} />}>Leaderboard</NavLink>
            <NavLink to="/feed" icon={<MessageSquare size={isKidsMode ? 20 : 18} />}>Feed</NavLink>
          </nav>
          
          {showAuthButtons && (
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" asChild className={isKidsMode ? "border-kids-primary text-kids-primary hover:bg-kids-primary/10 py-5 px-4" : ""}>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              
              <Button size="sm" asChild className={isKidsMode ? "kids-button py-5 px-4" : ""}>
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
              
              <ThemeToggle />
            </div>
          )}
          
          {!showAuthButtons && <ThemeToggle />}
        </div>
        
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 pt-16 animate-fade-in">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            <NavLink to="/" icon={<Home size={24} />}>Home</NavLink>
            <NavLink to="/dashboard" icon={<Gauge size={24} />}>Dashboard</NavLink>
            <NavLink to="/courses" icon={<Book size={24} />}>Courses</NavLink>
            <NavLink to="/leaderboard" icon={<Award size={24} />}>Leaderboard</NavLink>
            <NavLink to="/feed" icon={<MessageSquare size={24} />}>Feed</NavLink>
            <NavLink to="/profile" icon={<User size={24} />}>Profile</NavLink>
            
            <div className="mt-4 flex flex-col gap-4">
              {showAuthButtons && (
                <>
                  <Button asChild className={`w-full ${isKidsMode ? "kids-button text-xl py-6" : ""}`}>
                    <Link to="/login">
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </Link>
                  </Button>
                  
                  <Button asChild className={`w-full ${isKidsMode ? "kids-button text-xl py-6" : ""}`} variant={isKidsMode ? "default" : "outline"}>
                    <Link to="/signup">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
              
              <div className="flex justify-between items-center mt-4 p-4 border border-border rounded-lg">
                <span>Theme</span>
                <ThemeToggle />
              </div>
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-2" onClick={() => console.log("CodePulse Beats toggled")}>
                <Music size={18} />
                <span>CodePulse Beats</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
