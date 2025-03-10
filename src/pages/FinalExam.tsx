
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Timer, Trophy, AlertCircle, CheckCircle, ArrowLeft, FileText, PenTool } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';

const FinalExam = () => {
  const { id } = useParams();
  const { isKidsMode } = useTheme();
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(90); // Minutes
  
  // Mock exam data
  const exam = {
    courseId: parseInt(id as string),
    courseTitle: "React Framework",
    duration: 90, // Minutes
    totalQuestions: 5,
    passingScore: 70,
    instructions: [
      "You have 90 minutes to complete this exam.",
      "The exam consists of 5 coding challenges.",
      "You must score at least 70% to pass.",
      "You cannot return to previous questions once submitted.",
      "You can use any built-in methods available in JavaScript and React."
    ],
    questions: [
      {
        id: 1,
        title: "Create a Counter Component",
        description: "Create a functional component that renders a counter with increment and decrement buttons.",
        instructions: [
          "Use useState to manage the counter state",
          "Include buttons to increment and decrement the counter",
          "The counter should not go below 0"
        ],
        startingCode: `import React from 'react';\n\nfunction Counter() {\n  // Implement your counter component here\n  \n  return (\n    <div>\n      {/* Your counter UI goes here */}\n    </div>\n  );\n}\n\nexport default Counter;`,
        points: 20
      },
      {
        id: 2,
        title: "Fetch and Display Data",
        description: "Create a component that fetches data from an API and displays it in a list.",
        instructions: [
          "Use useEffect to fetch data when the component mounts",
          "Display a loading state while fetching",
          "Handle errors if the fetch fails",
          "Display the fetched data in a list"
        ],
        startingCode: `import React from 'react';\n\nfunction DataFetcher() {\n  // Implement your data fetcher component here\n  \n  return (\n    <div>\n      {/* Your data display UI goes here */}\n    </div>\n  );\n}\n\nexport default DataFetcher;`,
        points: 20
      },
      {
        id: 3,
        title: "Create a Form with Validation",
        description: "Create a form component with validation for email and password fields.",
        instructions: [
          "Create a form with email and password inputs",
          "Validate email format using a regex pattern",
          "Password must be at least 8 characters long",
          "Display error messages for invalid inputs",
          "Handle form submission"
        ],
        startingCode: `import React from 'react';\n\nfunction FormValidator() {\n  // Implement your form component here\n  \n  return (\n    <div>\n      {/* Your form UI goes here */}\n    </div>\n  );\n}\n\nexport default FormValidator;`,
        points: 20
      },
      {
        id: 4,
        title: "Create a Custom Hook",
        description: "Create a custom hook called useLocalStorage that stores and retrieves values from localStorage.",
        instructions: [
          "The hook should accept a key and an initial value",
          "It should return the current value and a setter function",
          "The setter should update both the state and localStorage",
          "The hook should retrieve the value from localStorage on initial render"
        ],
        startingCode: `import { useState, useEffect } from 'react';\n\nfunction useLocalStorage(key, initialValue) {\n  // Implement your custom hook here\n}\n\n// Example usage:\n// const [value, setValue] = useLocalStorage('myKey', 'initialValue');`,
        points: 20
      },
      {
        id: 5,
        title: "Create a Memoized Component",
        description: "Create a component that uses React.memo, useMemo, and useCallback for optimization.",
        instructions: [
          "Create a parent component with a state and a button to update it",
          "Create a child component that receives props from the parent",
          "Use React.memo to memoize the child component",
          "Use useMemo to memoize a calculated value",
          "Use useCallback to memoize a function passed to the child"
        ],
        startingCode: `import React, { useState, useMemo, useCallback } from 'react';\n\n// Implement the child component\nconst ChildComponent = () => {\n  return <div></div>;\n};\n\n// Implement the parent component\nfunction ParentComponent() {\n  return (\n    <div>\n      {/* Your parent component UI goes here */}\n    </div>\n  );\n}\n\nexport default ParentComponent;`,
        points: 20
      }
    ],
    results: {
      score: 85,
      passed: true,
      feedback: [
        { questionId: 1, score: 20, feedback: "Excellent implementation of the counter component with all requirements fulfilled." },
        { questionId: 2, score: 20, feedback: "Great job handling all fetch states including loading and errors." },
        { questionId: 3, score: 15, feedback: "Good form implementation, but missing some error handling for submission." },
        { questionId: 4, score: 15, feedback: "Custom hook works correctly but could use more error handling." },
        { questionId: 5, score: 15, feedback: "Good use of memo and useMemo, but the useCallback implementation could be improved." }
      ]
    }
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setCode(exam.questions[0].startingCode);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < exam.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCode(exam.questions[currentQuestion + 1].startingCode);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCode(exam.questions[currentQuestion - 1].startingCode);
    }
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
  };

  // Format time as mm:ss
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isKidsMode ? 'text-kids-foreground' : ''}`}>
            Final Exam: {exam.courseTitle}
          </h1>
          <p className={`mt-1 ${isKidsMode ? 'text-kids-foreground text-lg' : 'text-muted-foreground'}`}>
            Demonstrate your mastery of React concepts
          </p>
        </div>
        {examStarted && !examSubmitted && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isKidsMode ? 'bg-kids-muted text-kids-primary' : 'bg-muted'}`}>
            <Timer className="h-5 w-5" />
            <span className={`font-mono font-medium ${isKidsMode ? 'text-kids-primary text-lg' : ''}`}>
              {formatTime(timeLeft)} remaining
            </span>
          </div>
        )}
      </div>
      
      {/* Welcome / Instructions Screen */}
      {!examStarted && (
        <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>
              <FileText className="h-5 w-5" />
              React Framework Final Exam
            </CardTitle>
            <CardDescription className={isKidsMode ? 'text-kids-foreground' : ''}>
              This exam will test your understanding of key React concepts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-4 rounded-md ${isKidsMode ? 'bg-kids-muted' : 'bg-muted'}`}>
              <h3 className={`flex items-center gap-2 mb-3 font-medium ${isKidsMode ? 'text-kids-primary text-lg' : ''}`}>
                <AlertCircle className="h-5 w-5" />
                Exam Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>
                    <Timer className="h-4 w-4" />
                    Duration: {formatTime(exam.duration)}
                  </p>
                  <p className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>
                    <PenTool className="h-4 w-4" />
                    Questions: {exam.totalQuestions}
                  </p>
                </div>
                <div>
                  <p className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>
                    <Trophy className="h-4 w-4" />
                    Passing Score: {exam.passingScore}%
                  </p>
                  <p className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>
                    <CheckCircle className="h-4 w-4" />
                    Certificate: Upon passing
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className={`font-medium mb-3 ${isKidsMode ? 'text-kids-primary text-lg' : ''}`}>Instructions:</h3>
              <ul className="space-y-2 list-disc list-inside">
                {exam.instructions.map((instruction, index) => (
                  <li key={index} className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={`p-4 rounded-md border ${isKidsMode ? 'border-kids-accent bg-kids-accent/10 text-kids-foreground' : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50'}`}>
              <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                <strong>Note:</strong> Once you start the exam, the timer will begin. Make sure you have {formatTime(exam.duration)} available to complete the exam without interruption.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}
              asChild
            >
              <Link to={`/courses/${id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Course
              </Link>
            </Button>
            <Button 
              onClick={handleStartExam}
              className={isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}
            >
              Start Exam
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Exam Questions */}
      {examStarted && !examSubmitted && (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={isKidsMode ? 'text-kids-foreground' : ''}>
                Question {currentQuestion + 1} of {exam.totalQuestions}
              </span>
              <span className={`font-medium ${isKidsMode ? 'text-kids-primary' : ''}`}>
                {Math.round(((currentQuestion + 1) / exam.totalQuestions) * 100)}%
              </span>
            </div>
            <Progress 
              value={Math.round(((currentQuestion + 1) / exam.totalQuestions) * 100)} 
              className={isKidsMode ? 'h-3 bg-kids-muted' : 'h-2'} 
            />
          </div>
          
          {/* Current question */}
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge className={isKidsMode ? 'mb-2 bg-kids-accent text-white' : 'mb-2'}>
                    {exam.questions[currentQuestion].points} points
                  </Badge>
                  <CardTitle className={isKidsMode ? 'text-kids-primary' : ''}>
                    Question {currentQuestion + 1}: {exam.questions[currentQuestion].title}
                  </CardTitle>
                  <CardDescription className={isKidsMode ? 'text-kids-foreground text-base' : ''}>
                    {exam.questions[currentQuestion].description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Instructions */}
              <div className={`p-4 rounded-md ${isKidsMode ? 'bg-kids-muted' : 'bg-muted'}`}>
                <h3 className={`font-medium mb-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>Instructions:</h3>
                <ul className="space-y-1 list-disc list-inside">
                  {exam.questions[currentQuestion].instructions.map((instruction, index) => (
                    <li key={index} className={isKidsMode ? 'text-kids-foreground' : ''}>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Code editor */}
              <div>
                <h3 className={`font-medium mb-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>Your Solution:</h3>
                <div className="h-[400px] border rounded-md overflow-hidden">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language="javascript"
                    theme={isKidsMode ? "light" : "vs-dark"}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}
                >
                  Previous
                </Button>
                {currentQuestion < exam.totalQuestions - 1 ? (
                  <Button 
                    onClick={handleNextQuestion}
                    className={isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmitExam}
                    className={isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}
                  >
                    Submit Exam
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Exam Results */}
      {examSubmitted && (
        <Card className={exam.results.passed ? (isKidsMode ? 'border-kids-secondary' : 'border-green-500') : 'border-red-500'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${exam.results.passed ? (isKidsMode ? 'text-kids-primary' : 'text-green-500') : 'text-red-500'}`}>
              <Trophy className="h-6 w-6" />
              Exam Results: {exam.results.passed ? 'Passed!' : 'Not Passed'}
            </CardTitle>
            <CardDescription className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
              You scored {exam.results.score}% {exam.results.passed ? '(Passing score: ' + exam.passingScore + '%)' : '(Needed ' + exam.passingScore + '% to pass)'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score visualization */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={isKidsMode ? 'text-kids-foreground' : ''}>Score: {exam.results.score}%</span>
                <span className={`font-medium ${exam.results.passed ? (isKidsMode ? 'text-kids-secondary' : 'text-green-500') : 'text-red-500'}`}>
                  {exam.results.passed ? 'Passed' : 'Failed'}
                </span>
              </div>
              <Progress 
                value={exam.results.score} 
                className={`${isKidsMode ? 'h-3' : 'h-2'} ${exam.results.passed ? (isKidsMode ? 'bg-kids-muted' : '') : 'bg-red-200 dark:bg-red-950'}`}
              />
              <div className={`${isKidsMode ? 'bg-kids-muted' : 'bg-muted'} h-1 relative mt-1 rounded-full`}>
                <div 
                  className={`absolute top-0 bottom-0 w-1 rounded-full ${isKidsMode ? 'bg-kids-primary' : 'bg-primary'}`}
                  style={{ left: `${exam.passingScore}%` }}
                ></div>
                <div className={`absolute -bottom-6 text-xs ${isKidsMode ? 'text-kids-primary' : 'text-primary'}`} style={{ left: `${exam.passingScore}%`, transform: 'translateX(-50%)' }}>
                  Passing Score
                </div>
              </div>
            </div>
            
            <Separator className={isKidsMode ? 'bg-kids-muted' : ''} />
            
            {/* Detailed feedback */}
            <div>
              <h3 className={`font-medium mb-4 ${isKidsMode ? 'text-kids-primary text-lg' : ''}`}>Detailed Feedback:</h3>
              <div className="space-y-4">
                {exam.results.feedback.map((item) => (
                  <div key={item.questionId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className={`font-medium ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>
                        Question {item.questionId}: {exam.questions[item.questionId - 1].title}
                      </h4>
                      <Badge className={item.score === exam.questions[item.questionId - 1].points ? (isKidsMode ? 'bg-kids-secondary text-white' : 'bg-green-500') : (isKidsMode ? 'bg-kids-accent' : 'bg-yellow-500')}>
                        {item.score}/{exam.questions[item.questionId - 1].points} points
                      </Badge>
                    </div>
                    <p className={isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}>
                      {item.feedback}
                    </p>
                    <Separator className={isKidsMode ? 'bg-kids-muted' : ''} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certificate section (if passed) */}
            {exam.results.passed && (
              <div className={`p-6 rounded-lg border-2 text-center ${isKidsMode ? 'border-kids-secondary bg-kids-secondary/5' : 'border-green-500 bg-green-50 dark:bg-green-950/20'}`}>
                <Trophy className={`h-12 w-12 mx-auto mb-4 ${isKidsMode ? 'text-kids-primary' : 'text-yellow-500'}`} />
                <h3 className={`text-xl font-bold mb-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>
                  Congratulations!
                </h3>
                <p className={`mb-4 ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>
                  You've successfully completed the {exam.courseTitle} course and passed the final exam.
                </p>
                <Button 
                  className={isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}
                >
                  View & Download Certificate
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}
              asChild
            >
              <Link to={`/courses/${id}`}>
                Back to Course
              </Link>
            </Button>
            {!exam.results.passed && (
              <Button className={isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}>
                Retake Exam
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default FinalExam;
