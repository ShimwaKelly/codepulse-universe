
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, Music, User, Book, Home, Award, MessageSquare } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isKidsMode } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-secondary ${isKidsMode ? 'text-lg font-medium kids-text' : ''}`}
      onClick={closeMenu}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );

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
            <NavLink to="/" icon={<Home size={18} />}>Home</NavLink>
            <NavLink to="/courses" icon={<Book size={18} />}>Courses</NavLink>
            <NavLink to="/leaderboard" icon={<Award size={18} />}>Leaderboard</NavLink>
            <NavLink to="/feed" icon={<MessageSquare size={18} />}>Feed</NavLink>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" asChild className={isKidsMode ? "kids-button text-lg py-6 px-4" : ""}>
              <Link to="/login">Login</Link>
            </Button>
            
            <Button size="sm" asChild className={isKidsMode ? "kids-button text-lg py-6 px-4" : ""}>
              <Link to="/signup">Sign Up</Link>
            </Button>
            
            <ThemeToggle />
          </div>
        </div>
        
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 bg-background ${isKidsMode ? 'kids-background' : ''} z-40 pt-16 animate-fade-in`}>
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            <NavLink to="/" icon={<Home size={24} />}>Home</NavLink>
            <NavLink to="/courses" icon={<Book size={24} />}>Courses</NavLink>
            <NavLink to="/leaderboard" icon={<Award size={24} />}>Leaderboard</NavLink>
            <NavLink to="/feed" icon={<MessageSquare size={24} />}>Feed</NavLink>
            <NavLink to="/profile" icon={<User size={24} />}>Profile</NavLink>
            
            <div className="mt-4 flex flex-col gap-4">
              <Button asChild className={`w-full ${isKidsMode ? "kids-button text-xl py-6" : ""}`}>
                <Link to="/login">Login</Link>
              </Button>
              
              <Button asChild className={`w-full ${isKidsMode ? "kids-button text-xl py-6" : ""}`} variant={isKidsMode ? "default" : "outline"}>
                <Link to="/signup">Sign Up</Link>
              </Button>
              
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
