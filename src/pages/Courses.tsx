
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from '@/contexts/ThemeContext';
import { Clock, Code, Star, Award, BookOpen, Cpu, Database, Ghost, Shield, Moon } from 'lucide-react';

// Mock courses data
const courses = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Learn the building blocks of web development",
    level: "Beginner",
    duration: "4 weeks",
    modules: 8,
    enrolled: 2345,
    rating: 4.7,
    isNew: true,
    icon: <Code className="h-10 w-10" />,
    tags: ["Frontend", "Web"]
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Master the language of the web",
    level: "Intermediate",
    duration: "6 weeks",
    modules: 12,
    enrolled: 1876,
    rating: 4.9,
    isNew: false,
    icon: <BookOpen className="h-10 w-10" />,
    tags: ["Frontend", "Programming"]
  },
  {
    id: 3,
    title: "React Framework",
    description: "Build modern, reactive web applications",
    level: "Advanced",
    duration: "8 weeks",
    modules: 15,
    enrolled: 1243,
    rating: 4.8,
    isNew: false,
    icon: <Cpu className="h-10 w-10" />,
    tags: ["Frontend", "Framework"]
  },
  {
    id: 4,
    title: "Python for Beginners",
    description: "Your first steps into programming",
    level: "Beginner",
    duration: "5 weeks",
    modules: 10,
    enrolled: 3421,
    rating: 4.6,
    isNew: false,
    icon: <Database className="h-10 w-10" />,
    tags: ["Backend", "Programming"]
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description: "Introduction to AI and data science",
    level: "Intermediate",
    duration: "10 weeks",
    modules: 20,
    enrolled: 967,
    rating: 4.5,
    isNew: true,
    icon: <Ghost className="h-10 w-10" />,
    tags: ["Data Science", "AI"]
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    description: "Learn to protect systems and networks",
    level: "Intermediate",
    duration: "7 weeks",
    modules: 14,
    enrolled: 789,
    rating: 4.7,
    isNew: false,
    icon: <Shield className="h-10 w-10" />,
    tags: ["Security", "IT"]
  },
  {
    id: 7,
    title: "Next.js Development",
    description: "Build full-stack React applications",
    level: "Advanced",
    duration: "6 weeks",
    modules: 12,
    enrolled: 654,
    rating: 4.9,
    isNew: true,
    icon: <Moon className="h-10 w-10" />,
    tags: ["Frontend", "Backend", "Framework"]
  },
  {
    id: 8,
    title: "Java Programming",
    description: "Object-oriented programming for everyone",
    level: "Intermediate",
    duration: "9 weeks",
    modules: 18,
    enrolled: 1432,
    rating: 4.6,
    isNew: false,
    icon: <Cpu className="h-10 w-10" />,
    tags: ["Backend", "Programming"]
  }
];

const Courses = () => {
  const { isKidsMode } = useTheme();
  const [filter, setFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  
  const filteredCourses = courses.filter(course => {
    const matchesTag = filter === 'all' || course.tags.includes(filter);
    const matchesLevel = levelFilter === 'all' || course.level.toLowerCase() === levelFilter.toLowerCase();
    return matchesTag && matchesLevel;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className={`text-4xl font-bold ${isKidsMode ? 'text-kids-foreground' : ''}`}>
            Explore Courses
          </h1>
          <p className={`mt-2 ${isKidsMode ? 'text-kids-foreground text-lg' : 'text-muted-foreground'}`}>
            Discover our collection of programming courses designed for all skill levels
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select onValueChange={value => setFilter(value)} defaultValue="all">
            <SelectTrigger className={`w-[140px] ${isKidsMode ? 'text-kids-foreground border-kids-primary' : ''}`}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Framework">Frameworks</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={value => setLevelFilter(value)} defaultValue="all">
            <SelectTrigger className={`w-[140px] ${isKidsMode ? 'text-kids-foreground border-kids-primary' : ''}`}>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => (
          <Link to={`/courses/${course.id}`} key={course.id} className="transition-all hover-lift">
            <Card className={`h-full overflow-hidden ${isKidsMode ? 'border-4 border-kids-secondary shadow-lg' : 'hover:shadow-md'}`}>
              <CardHeader className={`relative pb-2 ${isKidsMode ? 'bg-kids-accent/10' : ''}`}>
                <div className="mb-2 flex justify-center">
                  {course.icon}
                </div>
                <CardTitle className={`text-xl ${isKidsMode ? 'text-kids-primary' : ''}`}>
                  {course.title}
                </CardTitle>
                <CardDescription className={isKidsMode ? 'text-kids-foreground text-base' : ''}>
                  {course.description}
                </CardDescription>
                {course.isNew && (
                  <Badge className="absolute right-4 top-4 bg-black text-white dark:bg-white dark:text-black px-2 py-1 text-xs font-semibold rounded-full animate-pulse">
                    NEW
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className={isKidsMode ? 'border-kids-secondary text-kids-foreground' : ''}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className={`grid grid-cols-2 gap-2 text-sm ${isKidsMode ? 'text-kids-foreground text-base' : 'text-muted-foreground'}`}>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{course.rating}/5.0</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80' : ''}`}>
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className={`text-xl ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
            No courses found for your filters
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setFilter('all');
              setLevelFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Courses;
