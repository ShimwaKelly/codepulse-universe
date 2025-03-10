
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Trophy } from 'lucide-react';

const Index = () => {
  const { isKidsMode } = useTheme();

  return (
    <div className={`flex flex-col lg:flex-row gap-12 items-center min-h-[calc(100vh-16rem)] mt-8 ${isKidsMode ? 'kids-background' : 'digital-rain'}`}>
      {/* Left side - Marketing content */}
      <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
        <div>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight ${isKidsMode ? 'text-kids-primary' : ''}`}>
            Learn to Code <br />
            <span className={isKidsMode ? 'text-kids-foreground' : 'opacity-80'}>With</span> CodePulse Rwanda
          </h1>
          
          <p className={`text-xl ${isKidsMode ? 'text-kids-foreground text-2xl' : 'text-muted-foreground'}`}>
            A cutting-edge platform for Rwandan youth to master computer skills from HTML to Machine Learning.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8">
          <div className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-foreground text-xl' : ''}`}>
            <BookOpen size={isKidsMode ? 24 : 20} />
            <span>Interactive Courses</span>
          </div>
          
          <div className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-foreground text-xl' : ''}`}>
            <Code size={isKidsMode ? 24 : 20} />
            <span>Real Coding Challenges</span>
          </div>
          
          <div className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-foreground text-xl' : ''}`}>
            <Trophy size={isKidsMode ? 24 : 20} />
            <span>Earn Certificates</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
          <Button 
            size="lg" 
            className={`px-8 ${isKidsMode ? 'kids-button text-xl py-6' : ''}`}
            asChild
          >
            <Link to="/signup">Sign Up Free</Link>
          </Button>
          
          <Button 
            size="lg"
            variant="outline" 
            className={`px-8 ${isKidsMode ? 'border-kids-primary text-kids-primary hover:bg-kids-primary/10 text-xl py-6' : ''}`}
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
      
      {/* Right side - Image or illustration */}
      <div className="w-full max-w-md">
        <img 
          src="https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&auto=format&fit=crop" 
          alt="Children learning to code" 
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Index;
