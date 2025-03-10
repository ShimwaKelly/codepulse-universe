
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Timer, AlertCircle, Terminal, Check, X } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';

// Create a type for the CodeEditor props to fix the TypeScript error
interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  theme: string;
}

const Challenge = () => {
  const { id, challengeId } = useParams();
  const { isKidsMode } = useTheme();
  const [code, setCode] = useState(`// Write your solution here\nfunction reverseString(str) {\n  // TODO: Implement this function\n  return str;\n}\n\n// Test your solution\nconsole.log(reverseString("hello"));`);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<'pending' | 'success' | 'fail'>('pending');
  const [timeLeft, setTimeLeft] = useState(30); // Minutes
  
  // Mock challenge data
  const challenge = {
    id: parseInt(challengeId as string),
    courseId: parseInt(id as string),
    title: "String Reversal Challenge",
    imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=600&auto=format&fit=crop",
    difficulty: "Medium",
    points: 100,
    timeLimit: 30, // Minutes
    description: "Create a function that takes a string as input and returns the string reversed.",
    instructions: [
      "Your solution must work for any string input",
      "Implement the reverseString function",
      "You cannot use the built-in .reverse() method for arrays",
      "Your function should return the reversed string"
    ],
    examples: [
      { input: "hello", output: "olleh" },
      { input: "CodePulse", output: "esluPedoC" },
      { input: "racecar", output: "racecar" }
    ],
    hints: [
      "Try converting the string to an array first",
      "You can use a loop to build the reversed string",
      "Remember that strings are immutable in JavaScript"
    ],
    initialCode: `function reverseString(str) {\n  // TODO: Implement this function\n  return str;\n}\n\n// Test your solution\nconsole.log(reverseString("hello"));`,
    solution: `function reverseString(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}`
  };

  const handleSubmit = () => {
    // In a real app, this would evaluate the code against test cases
    setSubmitted(true);
    // For demo purposes, we'll just simulate success
    setResult('success');
  };

  const handleReset = () => {
    setCode(challenge.initialCode);
    setSubmitted(false);
    setResult('pending');
  };

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          to={`/courses/${id}`} 
          className={`flex items-center gap-1 hover:underline ${isKidsMode ? 'text-kids-foreground text-lg' : 'text-muted-foreground'}`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>
        <div className="flex items-center gap-2">
          <Timer className={`h-5 w-5 ${isKidsMode ? 'text-kids-primary' : ''}`} />
          <span className={`font-mono ${isKidsMode ? 'text-kids-foreground text-lg' : ''}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      
      {/* Challenge header */}
      <div className="relative rounded-xl overflow-hidden mb-6">
        <img 
          src={challenge.imageUrl} 
          alt={challenge.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white">
                Challenge #{challenge.id}: {challenge.title}
              </h1>
              <Badge className="bg-white text-black">
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline" className="border-white text-white">
                {challenge.points} points
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <p className={`text-lg ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
        {challenge.description}
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Instructions & Examples */}
        <div className="lg:col-span-1 space-y-6">
          {/* Instructions */}
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>
                <Terminal className="h-5 w-5" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                {challenge.instructions.map((instruction, index) => (
                  <li key={index} className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                    {instruction}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Examples */}
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>
                Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenge.examples.map((example, index) => (
                  <div key={index} className={`p-3 rounded-md ${isKidsMode ? 'bg-kids-muted' : 'bg-muted'}`}>
                    <div className="mb-2">
                      <span className={`text-sm font-medium ${isKidsMode ? 'text-kids-primary' : ''}`}>Input: </span>
                      <code className="font-mono bg-black/10 px-1 rounded">{example.input}</code>
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${isKidsMode ? 'text-kids-primary' : ''}`}>Output: </span>
                      <code className="font-mono bg-black/10 px-1 rounded">{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Hints */}
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>
                <AlertCircle className="h-5 w-5" />
                Hints
              </CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground' : ''}>
                Click on a hint if you're stuck
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {challenge.hints.map((hint, index) => (
                  <details key={index} className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                    <summary className="cursor-pointer hover:text-primary">Hint {index + 1}</summary>
                    <p className={`mt-2 pl-4 ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>
                      {hint}
                    </p>
                  </details>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Code Editor & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Code Editor */}
          <Card className={isKidsMode ? 'border-kids-secondary' : ''}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isKidsMode ? 'text-kids-primary' : ''}`}>
                Your Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-md overflow-hidden">
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  language="javascript"
                  theme={isKidsMode ? "light" : "vs-dark"}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className={isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}
              >
                Reset Code
              </Button>
              <Button 
                onClick={handleSubmit} 
                className={`${isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''} ${submitted && result === 'success' ? 'pointer-events-none opacity-50' : ''}`}
                disabled={submitted && result === 'success'}
              >
                {submitted && result === 'success' ? 'Submitted' : 'Submit Solution'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Results */}
          {submitted && (
            <Card className={`border-2 ${result === 'success' ? (isKidsMode ? 'border-kids-secondary bg-kids-secondary/10' : 'border-green-500 bg-green-500/10') : 'border-red-500 bg-red-500/10'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${result === 'success' ? (isKidsMode ? 'text-kids-secondary' : 'text-green-500') : 'text-red-500'}`}>
                  {result === 'success' ? (
                    <>
                      <Check className="h-5 w-5" />
                      Challenge Completed!
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5" />
                      Solution Failed
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result === 'success' ? (
                  <div className="space-y-4">
                    <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                      Congratulations! Your solution passed all test cases.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className={isKidsMode ? 'bg-kids-primary' : ''}>+{challenge.points} points</Badge>
                      <Badge variant="outline" className={isKidsMode ? 'border-kids-secondary text-kids-secondary' : ''}>New Badge: Code Solver</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                      Your solution didn't pass all the test cases. See the details below and try again.
                    </p>
                    <div className={`p-3 rounded-md ${isKidsMode ? 'bg-kids-muted' : 'bg-muted'}`}>
                      <div className="mb-2">
                        <span className={`text-sm font-medium ${isKidsMode ? 'text-kids-foreground' : ''}`}>Test Case 1: </span>
                        <Badge variant="outline" className="text-red-500 border-red-500">Failed</Badge>
                      </div>
                      <div className="mb-1">
                        <span className={`text-sm ${isKidsMode ? 'text-kids-foreground' : ''}`}>Input: </span>
                        <code className="font-mono bg-black/10 px-1 rounded">hello</code>
                      </div>
                      <div className="mb-1">
                        <span className={`text-sm ${isKidsMode ? 'text-kids-foreground' : ''}`}>Expected: </span>
                        <code className="font-mono bg-black/10 px-1 rounded">olleh</code>
                      </div>
                      <div>
                        <span className={`text-sm ${isKidsMode ? 'text-kids-foreground' : ''}`}>Received: </span>
                        <code className="font-mono bg-black/10 px-1 rounded">hello</code>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {result === 'success' ? (
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${isKidsMode ? 'text-kids-foreground border-kids-secondary' : ''}`}
                      asChild
                    >
                      <Link to={`/courses/${id}`}>
                        Back to Course
                      </Link>
                    </Button>
                    <Button 
                      className={`flex-1 ${isKidsMode ? 'bg-kids-primary hover:bg-kids-primary/80 text-white' : ''}`}
                      asChild
                    >
                      <Link to={`/courses/${id}/challenge/${parseInt(challengeId as string) + 1}`}>
                        Next Challenge
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleReset}
                    className="w-full"
                    variant="outline"
                  >
                    Try Again
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenge;
