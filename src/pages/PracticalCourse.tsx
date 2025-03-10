
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle, InfoIcon, BookOpen, Video, Terminal, Award } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';

const PracticalCourse = () => {
  const { id, moduleId } = useParams();
  const { isKidsMode } = useTheme();
  const [activeTab, setActiveTab] = useState("lesson");
  const [code, setCode] = useState(`// Write your JavaScript code here\n\nfunction sayHello() {\n  console.log("Hello, world!");\n  return "Hello, world!";\n}\n\n// Call the function\nsayHello();`);
  const [outputText, setOutputText] = useState("");
  const [checkResult, setCheckResult] = useState<null | { passed: boolean; message: string }>(null);
  
  // Mock module data
  const module = {
    id: parseInt(moduleId as string),
    courseId: parseInt(id as string),
    title: "useState and useEffect",
    description: "Learn how to manage state and side effects in functional components",
    progress: 45,
    videoUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0", // placeholder
    isCompleted: false,
    
    // Module content
    lessonContent: `
# Using React Hooks: useState and useEffect

React Hooks are functions that let you "hook into" React state and lifecycle features from function components. 
They were introduced in React 16.8 and have changed how we write React components.

## The useState Hook

The \`useState\` hook allows you to add state to functional components. Let's look at a basic example:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

In this example:
- We call \`useState\` with the initial state value (0)
- It returns a pair: the current state value (\`count\`) and a function to update it (\`setCount\`)
- When the button is clicked, we call \`setCount\` to update the state

## The useEffect Hook

The \`useEffect\` hook lets you perform side effects in function components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
    
    // Optional cleanup function (similar to componentWillUnmount)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Key Points

1. **Rules of Hooks**:
   - Only call hooks at the top level of your component
   - Only call hooks from React function components or custom hooks

2. **Dependencies Array**:
   - The second argument to \`useEffect\` is an array of dependencies
   - If any dependency changes, the effect will run again
   - An empty array \`[]\` means the effect only runs once (on mount)
   - No array means the effect runs after every render
    `,
    
    challenge: {
      title: "Counter Component Challenge",
      description: "Create a counter component that increments when a button is clicked, and updates the document title with the current count.",
      instructions: [
        "Use the useState hook to track the count",
        "Use the useEffect hook to update the document title",
        "Create a button that increments the count when clicked"
      ],
      startingCode: `import React from 'react';

function Counter() {
  // TODO: Add state for count
  
  // TODO: Add effect to update document title
  
  return (
    <div>
      <p>Current count: 0</p>
      {/* TODO: Add button to increment count */}
    </div>
  );
}

export default Counter;`,
      solution: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
      hints: [
        "Remember to import useState and useEffect from React",
        "The useState function returns an array with two items: the current state and a function to update it",
        "The useEffect hook takes a function as its first argument and a dependency array as its second"
      ]
    },
    
    // Navigation links
    prevModule: {
      id: 8,
      title: "Hooks Introduction"
    },
    nextModule: {
      id: 10,
      title: "Custom Hooks"
    }
  };

  const handleRunCode = () => {
    // In a real app, this would execute the code
    setOutputText("Hello, world!");
  };

  const handleCheckCode = () => {
    // This would actually check the code against the solution
    // For now, we'll simulate a successful check
    setCheckResult({
      passed: true,
      message: "Great job! Your counter component is working correctly."
    });
  };

  return (
    <div className="space-y-8">
      {/* Course navigation */}
      <div className="flex items-center justify-between">
        <Link 
          to={`/courses/${id}`} 
          className={`flex items-center gap-1 hover:underline ${isKidsMode ? 'text-kids-foreground text-lg' : 'text-muted-foreground'}`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
            Module {module.id} of 15
          </span>
          <Progress value={module.progress} className={`w-24 ${isKidsMode ? 'h-3 bg-kids-muted' : 'h-2'}`} />
        </div>
      </div>
      
      {/* Module header */}
      <div className="space-y-4">
        <h1 className={`text-3xl font-bold ${isKidsMode ? 'text-kids-foreground' : ''}`}>
          {module.id}. {module.title}
        </h1>
        <p className={`text-lg ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
          {module.description}
        </p>
      </div>
      
      {/* Module content tabs */}
      <Tabs defaultValue="lesson" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger 
            value="lesson" 
            className={isKidsMode ? 'text-kids-foreground data-[state=active]:bg-kids-accent data-[state=active]:text-white' : ''}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Lesson
          </TabsTrigger>
          <TabsTrigger 
            value="video" 
            className={isKidsMode ? 'text-kids-foreground data-[state=active]:bg-kids-accent data-[state=active]:text-white' : ''}
          >
            <Video className="h-4 w-4 mr-2" />
            Video
          </TabsTrigger>
          <TabsTrigger 
            value="challenge" 
            className={isKidsMode ? 'text-kids-foreground data-[state=active]:bg-kids-accent data-[state=active]:text-white' : ''}
          >
            <Terminal className="h-4 w-4 mr-2" />
            Challenge
          </TabsTrigger>
        </TabsList>
        
        {/* Lesson content */}
        <TabsContent value="lesson" className="space-y-6">
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardContent className="pt-6">
              <div className={`prose max-w-none ${isKidsMode ? 'text-kids-foreground prose-headings:text-kids-primary prose-strong:text-kids-primary prose-code:text-kids-accent prose-code:bg-kids-muted' : 'dark:prose-invert'}`}>
                <div dangerouslySetInnerHTML={{ __html: module.lessonContent.replace(/\n/g, '<br>') }} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              {module.prevModule ? (
                <Button variant="outline" className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''} asChild>
                  <Link to={`/courses/${id}/module/${module.prevModule.id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous: {module.prevModule.title}
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}
              
              {module.nextModule && (
                <Button className={isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''} asChild>
                  <Link to={`/courses/${id}/module/${module.nextModule.id}`}>
                    Next: {module.nextModule.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Video content */}
        <TabsContent value="video" className="space-y-6">
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-kids-primary' : ''}>Video Lesson: {module.title}</CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground' : ''}>
                Watch the video tutorial to understand useState and useEffect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`aspect-video bg-muted ${isKidsMode ? 'bg-kids-muted' : ''} rounded-md flex items-center justify-center`}>
                <div className="text-center p-6">
                  <Video className={`h-16 w-16 mx-auto mb-4 ${isKidsMode ? 'text-kids-primary' : ''}`} />
                  <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                    Video player would be embedded here in production
                  </p>
                  <Button className={`mt-4 ${isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}`}>
                    Play Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Challenge content */}
        <TabsContent value="challenge" className="space-y-6">
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-kids-primary' : ''}>
                {module.challenge.title}
              </CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground' : ''}>
                {module.challenge.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Challenge instructions */}
              <div className={`p-4 rounded-md bg-accent ${isKidsMode ? 'bg-kids-muted text-kids-foreground' : ''}`}>
                <h3 className={`flex items-center gap-2 text-lg font-medium mb-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>
                  <InfoIcon className="h-5 w-5" />
                  Instructions
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {module.challenge.instructions.map((instruction, index) => (
                    <li key={index} className={isKidsMode ? 'text-kids-foreground' : ''}>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Code editor */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className={`font-medium ${isKidsMode ? 'text-kids-primary text-lg' : ''}`}>
                    Your Solution
                  </h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}
                      onClick={() => setCode(module.challenge.startingCode)}
                    >
                      Reset Code
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}
                    >
                      Show Hint
                    </Button>
                  </div>
                </div>
                
                <div className="h-[400px] border rounded-md overflow-hidden">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language="javascript"
                    theme={isKidsMode ? "light" : "vs-dark"}
                  />
                </div>
                
                <div className="flex justify-between items-center gap-4">
                  <Button 
                    variant="outline" 
                    className={`flex-1 ${isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}`}
                    onClick={handleRunCode}
                  >
                    Run Code
                  </Button>
                  <Button 
                    className={`flex-1 ${isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}`}
                    onClick={handleCheckCode}
                  >
                    Check Solution
                  </Button>
                </div>
                
                {/* Output/Results */}
                {(outputText || checkResult) && (
                  <div className={`mt-4 p-4 rounded-md ${isKidsMode ? 'bg-kids-muted' : 'bg-muted'}`}>
                    {outputText && (
                      <div className="mb-4">
                        <h4 className={`text-sm font-medium mb-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>Output:</h4>
                        <pre className={`p-2 rounded bg-black text-white font-mono text-sm overflow-x-auto ${isKidsMode ? 'bg-black/80' : ''}`}>
                          {outputText}
                        </pre>
                      </div>
                    )}
                    
                    {checkResult && (
                      <div className={`p-3 rounded-md flex items-start gap-3 ${checkResult.passed ? (isKidsMode ? 'bg-kids-secondary/30' : 'bg-green-500/10') : (isKidsMode ? 'bg-red-500/10' : 'bg-red-500/10')}`}>
                        {checkResult.passed ? (
                          <CheckCircle className={isKidsMode ? 'text-kids-secondary h-5 w-5 mt-0.5' : 'text-green-500 h-5 w-5 mt-0.5'} />
                        ) : (
                          <XCircle className={isKidsMode ? 'text-red-500 h-5 w-5 mt-0.5' : 'text-red-500 h-5 w-5 mt-0.5'} />
                        )}
                        <div>
                          <h4 className={`font-medium ${checkResult.passed ? (isKidsMode ? 'text-kids-primary' : 'text-green-500') : (isKidsMode ? 'text-red-500' : 'text-red-500')}`}>
                            {checkResult.passed ? 'Success!' : 'Not quite right'}
                          </h4>
                          <p className={isKidsMode ? 'text-kids-foreground' : ''}>
                            {checkResult.message}
                          </p>
                          {checkResult.passed && (
                            <Button 
                              className={`mt-2 ${isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}`}
                              asChild
                            >
                              <Link to={`/courses/${id}/module/${parseInt(moduleId as string) + 1}`}>
                                Next Module
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// XCircle component for challenge failures
const XCircle = (props: any) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export default PracticalCourse;
