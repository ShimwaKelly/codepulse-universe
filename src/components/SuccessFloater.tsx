
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuccessFloaterProps {
  message: string;
  points: number;
  nextLink?: string;
  onClose?: () => void;
}

const SuccessFloater: React.FC<SuccessFloaterProps> = ({
  message,
  points,
  nextLink,
  onClose
}) => {
  const { isKidsMode } = useTheme();
  const [visible, setVisible] = useState(true);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; color: string }>>([]);

  useEffect(() => {
    // Create confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: isKidsMode 
        ? ['#FF6B6B', '#4ECDC4', '#FFD166', '#9C89B8', '#F4A261'][Math.floor(Math.random() * 5)]
        : ['#ffffff', '#cccccc', '#aaaaaa', '#888888', '#666666'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(pieces);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Allow animation to complete before removing from DOM
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm animate-fade-in">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      <div className={`
        max-w-md w-full mx-4 rounded-xl p-8 text-center transform transition-all duration-300 animate-scale-in
        ${isKidsMode 
          ? 'kids-card border-kids-primary bg-white' 
          : 'bg-white dark:bg-black border border-border shadow-2xl'
        }
      `}>
        <div className="mb-6">
          <CheckCircle2 
            size={isKidsMode ? 80 : 64}
            className={`
              mx-auto
              ${isKidsMode ? 'text-kids-primary' : 'text-green-500 dark:text-green-400'}
            `}
          />
        </div>
        
        <h2 className={`
          text-2xl font-bold mb-4
          ${isKidsMode ? 'text-kids-primary text-3xl' : ''}
        `}>
          {isKidsMode ? "Awesome Job! You Did It!" : "Success! You nailed it!"}
        </h2>
        
        <p className={`
          mb-6 text-lg
          ${isKidsMode ? 'text-kids-foreground text-xl' : 'text-muted-foreground'}
        `}>
          {message}
        </p>
        
        <div className={`
          flex items-center justify-center gap-2 mb-8 py-3 px-6 rounded-lg mx-auto w-fit
          ${isKidsMode 
            ? 'bg-kids-muted text-kids-primary text-xl' 
            : 'bg-secondary text-foreground'
          }
        `}>
          <Trophy size={isKidsMode ? 24 : 20} />
          <span className="font-bold">+{points} pts</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {nextLink && (
            <Button 
              asChild
              className={isKidsMode ? "kids-button text-xl py-6" : ""}
              size={isKidsMode ? "lg" : "default"}
            >
              <Link to={nextLink}>
                Next Challenge
                <ArrowRight size={isKidsMode ? 20 : 16} className="ml-2" />
              </Link>
            </Button>
          )}
          
          <Button 
            variant={isKidsMode ? "default" : "outline"}
            className={isKidsMode ? "kids-button bg-kids-accent text-xl py-6" : ""}
            size={isKidsMode ? "lg" : "default"}
            onClick={handleClose}
          >
            View Score
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessFloater;
