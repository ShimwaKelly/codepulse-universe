
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Clock } from 'lucide-react';

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  isNew?: boolean;
  enrolled?: boolean;
  progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  difficulty,
  duration,
  isNew,
  enrolled,
  progress
}) => {
  const { isKidsMode } = useTheme();
  
  const getDifficultyColor = (difficulty: string) => {
    if (isKidsMode) return 'bg-kids-secondary text-kids-foreground';
    
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div 
      className={`
        rounded-xl overflow-hidden transition-all duration-300 hover-lift hover-glow
        ${isKidsMode 
          ? 'kids-card' 
          : 'glass-card'
        }
      `}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <h3 className={`font-bold ${isKidsMode ? 'text-2xl text-kids-foreground' : 'text-xl'}`}>
              {title}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
              
              <Badge variant="outline" className={isKidsMode ? 'bg-kids-muted text-kids-foreground' : 'bg-secondary'}>
                <Clock size={14} className="mr-1" />
                {duration}
              </Badge>
            </div>
          </div>
          
          {isNew && (
            <Badge 
              className={`
                ${isKidsMode 
                  ? 'bg-kids-primary text-white' 
                  : 'bg-black text-white dark:bg-white dark:text-black'
                } animate-pulse
              `}
            >
              New
            </Badge>
          )}
        </div>
        
        <p className={`
          mb-6 flex-grow
          ${isKidsMode ? 'text-kids-foreground text-lg' : 'text-muted-foreground'}
        `}>
          {description}
        </p>
        
        {enrolled && progress !== undefined ? (
          <div className="mt-auto space-y-4">
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${isKidsMode ? 'bg-kids-primary' : 'bg-black dark:bg-white'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className={isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}>
                Progress: {progress}%
              </span>
              
              <Button 
                asChild
                variant={isKidsMode ? "default" : "outline"}
                className={isKidsMode ? "kids-button" : ""}
              >
                <Link to={`/courses/${id}`}>
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            asChild
            className={`mt-auto ${isKidsMode ? 'kids-button text-lg py-6' : ''}`}
            variant={isKidsMode ? "default" : "default"}
          >
            <Link to={`/courses/${id}`}>
              {isKidsMode ? (
                <>Start Learning</>
              ) : (
                <>Enroll Now</>
              )}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
