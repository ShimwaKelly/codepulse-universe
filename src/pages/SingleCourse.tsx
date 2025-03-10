
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/contexts/ThemeContext';
import { BookOpen, Clock, Trophy, Users, PlayCircle, Award, CheckCircle } from 'lucide-react';

const SingleCourse = () => {
  const { id } = useParams();
  const { isKidsMode } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock course data based on ID
  const course = {
    id: parseInt(id as string),
    title: "React Framework",
    description: "Master React and build modern web applications with the most popular JavaScript library for building user interfaces.",
    longDescription: "This comprehensive course takes you from React basics to advanced concepts. You'll learn about component architecture, state management with hooks and Redux, routing with React Router, and how to build performant applications. By the end of the course, you'll be able to build complete React applications from scratch.",
    level: "Advanced",
    duration: "8 weeks",
    modules: 15,
    progress: 60,
    enrolled: 1243,
    instructor: "Sarah Johnson",
    rating: 4.8,
    updated: "June 2023",
    prerequisites: ["JavaScript Essentials", "HTML & CSS Fundamentals"],
    modulesList: [
      { id: 1, title: "Introduction to React", completed: true, duration: "45 min" },
      { id: 2, title: "Components and Props", completed: true, duration: "1 hr 10 min" },
      { id: 3, title: "State and Lifecycle", completed: true, duration: "1 hr 30 min" },
      { id: 4, title: "Handling Events", completed: true, duration: "55 min" },
      { id: 5, title: "Conditional Rendering", completed: true, duration: "45 min" },
      { id: 6, title: "Lists and Keys", completed: true, duration: "1 hr" },
      { id: 7, title: "Forms and Controlled Components", completed: true, duration: "1 hr 20 min" },
      { id: 8, title: "Hooks Introduction", completed: false, duration: "1 hr 15 min" },
      { id: 9, title: "useState and useEffect", completed: false, duration: "1 hr 30 min" },
      { id: 10, title: "Custom Hooks", completed: false, duration: "1 hr" },
      { id: 11, title: "Context API", completed: false, duration: "1 hr 15 min" },
      { id: 12, title: "React Router", completed: false, duration: "1 hr 30 min" },
      { id: 13, title: "Redux Fundamentals", completed: false, duration: "2 hr" },
      { id: 14, title: "Advanced React Patterns", completed: false, duration: "1 hr 45 min" },
      { id: 15, title: "Building a Final Project", completed: false, duration: "3 hr" },
    ],
    reviews: [
      { id: 1, user: "Michael L.", rating: 5, comment: "The best React course I've taken. Very comprehensive and well-explained.", date: "May 15, 2023" },
      { id: 2, user: "Lisa K.", rating: 4, comment: "Great content, but some advanced topics could use more examples.", date: "April 23, 2023" },
      { id: 3, user: "David M.", rating: 5, comment: "Excellent course. The instructor really knows how to explain complex concepts in an easy way.", date: "March 10, 2023" }
    ]
  };

  const completedModules = course.modulesList.filter(module => module.completed).length;
  const totalModules = course.modulesList.length;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className={`text-4xl font-bold ${isKidsMode ? 'text-kids-foreground' : ''}`}>{course.title}</h1>
            <Badge variant="outline" className={isKidsMode ? 'text-kids-primary border-kids-primary' : ''}>
              {course.level}
            </Badge>
          </div>
          <p className={`text-lg ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
            {course.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className={isKidsMode ? 'text-kids-foreground' : ''}>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className={isKidsMode ? 'text-kids-foreground' : ''}>{course.modules} modules</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className={isKidsMode ? 'text-kids-foreground' : ''}>{course.enrolled} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className={isKidsMode ? 'text-kids-foreground' : ''}>{course.rating}/5.0 rating</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button className={`w-full ${isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}`} asChild>
            <Link to={`/courses/${id}/module/1`}>
              {completedModules > 0 ? 'Continue Learning' : 'Start Learning'}
            </Link>
          </Button>
          <Button variant="outline" className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''} asChild>
            <Link to={`/courses/${id}/exam`}>
              Final Exam
            </Link>
          </Button>
        </div>
      </div>
      
      <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
        <CardHeader className="pb-4">
          <CardTitle className={isKidsMode ? 'text-kids-primary' : ''}>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={isKidsMode ? 'text-kids-foreground' : ''}>
                {completedModules} of {totalModules} modules completed
              </span>
              <span className={`font-bold ${isKidsMode ? 'text-kids-primary' : ''}`}>
                {progressPercentage}%
              </span>
            </div>
            <Progress value={progressPercentage} className={isKidsMode ? 'h-3 bg-kids-muted' : 'h-2'} />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview" className={isKidsMode ? 'text-kids-foreground data-[state=active]:bg-kids-accent data-[state=active]:text-white' : ''}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="modules" className={isKidsMode ? 'text-kids-foreground data-[state=active]:bg-kids-accent data-[state=active]:text-white' : ''}>
            Modules
          </TabsTrigger>
          <TabsTrigger value="reviews" className={isKidsMode ? 'text-kids-foreground data-[state=active]:bg-kids-accent data-[state=active]:text-white' : ''}>
            Reviews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-kids-primary' : ''}>About this Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                {course.longDescription}
              </p>
              <div className="space-y-4">
                <h3 className={`font-semibold text-lg ${isKidsMode ? 'text-kids-primary' : ''}`}>Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className={`font-semibold text-lg ${isKidsMode ? 'text-kids-primary' : ''}`}>What you'll learn</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Build reactive, performant interfaces</li>
                  <li className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Manage state using modern React techniques</li>
                  <li className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Implement React Router for efficient navigation</li>
                  <li className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Deploy React applications to production</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="modules" className="space-y-6">
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-kids-primary' : ''}>Course Modules</CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground' : ''}>
                Work through each module to master {course.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modulesList.map((module) => (
                  <div 
                    key={module.id} 
                    className={`flex items-center justify-between border-b pb-3 ${isKidsMode ? 'border-kids-muted' : 'border-border'} ${module.id === course.modulesList.length ? 'border-b-0' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 rounded-full p-1 ${module.completed ? (isKidsMode ? 'text-kids-secondary' : 'text-green-500') : 'text-muted-foreground'}`}>
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <PlayCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <Link 
                          to={`/courses/${id}/module/${module.id}`} 
                          className={`font-medium hover:underline ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}
                        >
                          {module.id}. {module.title}
                        </Link>
                        <p className={`text-sm ${isKidsMode ? 'text-kids-foreground/70' : 'text-muted-foreground'}`}>
                          {module.duration}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className={isKidsMode ? 'text-kids-accent' : ''} asChild>
                      <Link to={`/courses/${id}/module/${module.id}`}>
                        {module.completed ? 'Review' : 'Start'}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Last updated: {course.updated}
              </div>
              <div className="flex items-center gap-1">
                <Trophy className={`h-5 w-5 ${isKidsMode ? 'text-kids-primary' : 'text-yellow-500'}`} />
                <span className={isKidsMode ? 'text-kids-foreground' : ''}>Certificate upon completion</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-6">
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-kids-primary' : ''}>Student Reviews</CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground' : ''}>
                See what other students are saying about this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className={`font-medium ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>{review.user}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? (isKidsMode ? 'text-kids-primary' : 'text-yellow-500') : 'text-muted'}`} 
                              fill={i < review.rating ? 'currentColor' : 'none'} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className={`text-sm ${isKidsMode ? 'text-kids-foreground/70' : 'text-muted-foreground'}`}>
                        {review.date}
                      </span>
                    </div>
                    <p className={`mt-2 ${isKidsMode ? 'text-kids-foreground' : ''}`}>
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Write a Review</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Star component for reviews
const Star = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default SingleCourse;
