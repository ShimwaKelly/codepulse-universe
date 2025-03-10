
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Trophy, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Code, 
  AlertCircle,
  PlusCircle
} from 'lucide-react';
import CourseCard, { CourseCardProps } from '@/components/CourseCard';

const Dashboard = () => {
  const { isKidsMode } = useTheme();
  
  // Mock user data
  const user = {
    name: "Jean Uwimana",
    username: "jean_code",
    avatar: "",
    coursesEnrolled: 3,
    score: 75,
    badges: ["HTML Master", "CSS Expert", "JavaScript Beginner"],
    activities: [
      { id: 1, action: "Completed HTML Module 3", date: "2 days ago" },
      { id: 2, action: "Passed Next.js Challenge", date: "1 week ago" },
      { id: 3, action: "Started Python Basics", date: "2 weeks ago" }
    ]
  };
  
  // Mock enrolled courses data
  const enrolledCourses: CourseCardProps[] = [
    {
      id: "html-basics",
      title: "HTML Basics",
      description: "Learn the fundamentals of HTML to build web pages.",
      difficulty: "Beginner",
      duration: "4 weeks",
      enrolled: true,
      progress: 80
    },
    {
      id: "css-fundamentals",
      title: "CSS Fundamentals",
      description: "Style your web pages with CSS to make them beautiful.",
      difficulty: "Beginner",
      duration: "4 weeks",
      enrolled: true,
      progress: 45
    },
    {
      id: "javascript-intro",
      title: "JavaScript Introduction",
      description: "Add interactivity to your websites with JavaScript.",
      difficulty: "Intermediate",
      duration: "6 weeks",
      enrolled: true,
      progress: 10
    }
  ];
  
  // Mock project data
  const projects = [
    {
      id: 1,
      title: "Personal Portfolio",
      description: "A simple HTML & CSS portfolio site",
      lastEdited: "Yesterday"
    },
    {
      id: 2,
      title: "Todo App",
      description: "A JavaScript todo application",
      lastEdited: "3 days ago"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className={`
        p-6 md:p-8 rounded-xl space-y-4
        ${isKidsMode 
          ? 'bg-kids-secondary border-4 border-kids-primary' 
          : 'bg-grid-pattern-dark border border-border'
        }
      `}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className={`h-20 w-20 ${isKidsMode ? 'border-4 border-kids-primary' : 'border-2 border-border'}`}>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className={`text-2xl ${isKidsMode ? 'bg-kids-primary text-white' : ''}`}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center sm:text-left">
            <h1 className={`text-3xl font-bold ${isKidsMode ? 'text-kids-primary text-4xl' : ''}`}>
              {isKidsMode ? "Hello, Young Coder!" : `Welcome back, ${user.name.split(' ')[0]}`}
            </h1>
            
            <p className={isKidsMode ? 'text-kids-foreground text-xl mt-2' : 'text-muted-foreground mt-1'}>
              {isKidsMode 
                ? "Ready for another exciting day of coding adventures?" 
                : "Track your progress and continue your coding journey"
              }
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Card className={isKidsMode ? 'kids-card bg-white border-kids-primary' : 'glass-card'}>
            <CardContent className="p-4 flex flex-col items-center">
              <BookOpen className={`mb-2 ${isKidsMode ? 'text-kids-primary h-8 w-8' : 'h-6 w-6'}`} />
              <p className={`text-sm ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>Courses Enrolled</p>
              <p className={`font-bold ${isKidsMode ? 'text-kids-primary text-2xl' : 'text-xl'}`}>{user.coursesEnrolled}</p>
            </CardContent>
          </Card>
          
          <Card className={isKidsMode ? 'kids-card bg-white border-kids-primary' : 'glass-card'}>
            <CardContent className="p-4 flex flex-col items-center">
              <Trophy className={`mb-2 ${isKidsMode ? 'text-kids-primary h-8 w-8' : 'h-6 w-6'}`} />
              <p className={`text-sm ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>Score</p>
              <p className={`font-bold ${isKidsMode ? 'text-kids-primary text-2xl' : 'text-xl'}`}>{user.score}/100</p>
            </CardContent>
          </Card>
          
          <Card className={isKidsMode ? 'kids-card bg-white border-kids-primary' : 'glass-card'}>
            <CardContent className="p-4 flex flex-col items-center">
              <AlertCircle className={`mb-2 ${isKidsMode ? 'text-kids-primary h-8 w-8' : 'h-6 w-6'}`} />
              <p className={`text-sm ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>Next Challenge</p>
              <p className={`font-bold ${isKidsMode ? 'text-kids-primary text-2xl' : 'text-xl'}`}>3 Days</p>
            </CardContent>
          </Card>
          
          <Card className={isKidsMode ? 'kids-card bg-white border-kids-primary' : 'glass-card'}>
            <CardContent className="p-4 flex flex-col items-center">
              <Calendar className={`mb-2 ${isKidsMode ? 'text-kids-primary h-8 w-8' : 'h-6 w-6'}`} />
              <p className={`text-sm ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>Active Days</p>
              <p className={`font-bold ${isKidsMode ? 'text-kids-primary text-2xl' : 'text-xl'}`}>12</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Enrolled courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${isKidsMode ? 'text-kids-primary text-3xl' : ''}`}>
              Your Courses
            </h2>
            <Button variant="outline" size={isKidsMode ? "lg" : "default"} asChild>
              <Link to="/courses">
                Browse More
                <ChevronRight size={isKidsMode ? 20 : 16} className="ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
          <div className="mt-10">
            <h2 className={`text-2xl font-bold mb-4 ${isKidsMode ? 'text-kids-primary text-3xl' : ''}`}>
              Your Code Portfolio
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map(project => (
                <Card key={project.id} className={isKidsMode ? 'kids-card hover-lift' : 'glass-card hover-lift'}>
                  <CardContent className="p-6">
                    <Code className={`mb-2 ${isKidsMode ? 'text-kids-primary h-8 w-8' : 'h-6 w-6'}`} />
                    <h3 className={`font-semibold ${isKidsMode ? 'text-kids-foreground text-xl' : ''}`}>{project.title}</h3>
                    <p className={`text-sm mt-1 ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className={`text-xs border-t px-6 py-3 ${isKidsMode ? 'border-kids-muted' : 'border-border'}`}>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={12} />
                      <span>Edited {project.lastEdited}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className={`
                flex items-center justify-center hover-lift
                ${isKidsMode 
                  ? 'border-4 border-dashed border-kids-muted' 
                  : 'border-2 border-dashed border-border bg-background/50'
                }
              `}>
                <CardContent className="p-6 text-center">
                  <PlusCircle className={`mx-auto mb-2 ${isKidsMode ? 'text-kids-primary h-10 w-10' : 'text-muted-foreground h-8 w-8'}`} />
                  <p className={isKidsMode ? 'text-kids-foreground text-lg' : 'text-muted-foreground'}>
                    Create New Project
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Right column - Stats and activity */}
        <div className="space-y-8">
          {/* Badges section */}
          <Card className={isKidsMode ? 'kids-card' : 'glass-card'}>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-kids-primary text-2xl' : ''}>Your Badges</CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                Achievements you've earned
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isKidsMode 
                      ? 'bg-kids-primary text-white' 
                      : 'bg-secondary'
                    }
                  `}>
                    <Trophy size={isKidsMode ? 22 : 18} />
                  </div>
                  <div>
                    <p className={`font-medium ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>{badge}</p>
                    <p className={`text-sm ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
                      Earned on {new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size={isKidsMode ? "lg" : "default"}>
                View All Badges
              </Button>
            </CardFooter>
          </Card>
          
          {/* Activity feed */}
          <Card className={isKidsMode ? 'kids-card' : 'glass-card'}>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-kids-primary text-2xl' : ''}>Activity Log</CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                Your recent actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.activities.map(activity => (
                <div key={activity.id} className={`
                  p-3 rounded-lg
                  ${isKidsMode 
                    ? 'bg-kids-muted' 
                    : 'bg-secondary/50'
                  }
                `}>
                  <p className={isKidsMode ? 'text-kids-foreground text-lg font-medium' : 'font-medium'}>
                    {activity.action}
                  </p>
                  <p className={`text-sm ${isKidsMode ? 'text-kids-foreground/80' : 'text-muted-foreground'}`}>
                    {activity.date}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size={isKidsMode ? "lg" : "default"}>
                View Full History
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
