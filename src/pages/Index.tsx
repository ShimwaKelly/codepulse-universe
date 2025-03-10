
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight, Code, BookOpen, Trophy } from 'lucide-react';

const Index = () => {
  const { isKidsMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isParentalAuth, setIsParentalAuth] = useState(false);
  const [showParentEmail, setShowParentEmail] = useState(false);

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
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full max-w-md">
        <Card className={isKidsMode ? 'kids-card' : 'glass-card hover-glow'}>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 ${isKidsMode ? 'bg-kids-muted' : ''}`}>
              <TabsTrigger value="login" className={isKidsMode ? 'text-lg data-[state=active]:bg-kids-primary data-[state=active]:text-white' : ''}>Login</TabsTrigger>
              <TabsTrigger value="signup" className={isKidsMode ? 'text-lg data-[state=active]:bg-kids-primary data-[state=active]:text-white' : ''}>Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <form>
                <CardHeader>
                  <CardTitle className={isKidsMode ? 'text-2xl text-kids-primary' : ''}>Welcome back</CardTitle>
                  <CardDescription className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Email</Label>
                    <Input id="email" type="email" placeholder="hello@example.com" className={isKidsMode ? 'h-12 text-lg' : ''} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Password</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        className={isKidsMode ? 'h-12 text-lg pr-10' : 'pr-10'} 
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={isKidsMode ? 24 : 18} /> : <Eye size={isKidsMode ? 24 : 18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className={isKidsMode ? 'h-5 w-5 data-[state=checked]:bg-kids-primary data-[state=checked]:border-kids-primary' : ''} />
                    <label 
                      htmlFor="remember" 
                      className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isKidsMode ? 'text-kids-foreground text-base' : ''}`}
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${isKidsMode ? 'kids-button text-xl py-6' : ''}`}
                    asChild
                  >
                    <Link to="/dashboard">
                      Login
                      <ArrowRight size={isKidsMode ? 20 : 16} className="ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form>
                <CardHeader>
                  <CardTitle className={isKidsMode ? 'text-2xl text-kids-primary' : ''}>Create an account</CardTitle>
                  <CardDescription className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Name</Label>
                    <Input id="signup-name" placeholder="John Doe" className={isKidsMode ? 'h-12 text-lg' : ''} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Email</Label>
                    <Input id="signup-email" type="email" placeholder="hello@example.com" className={isKidsMode ? 'h-12 text-lg' : ''} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Password</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        className={isKidsMode ? 'h-12 text-lg pr-10' : 'pr-10'} 
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={isKidsMode ? 24 : 18} /> : <Eye size={isKidsMode ? 24 : 18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="parental" 
                      checked={isParentalAuth}
                      onCheckedChange={(checked) => {
                        setIsParentalAuth(checked === true);
                        setShowParentEmail(checked === true);
                      }}
                      className={isKidsMode ? 'h-5 w-5 data-[state=checked]:bg-kids-primary data-[state=checked]:border-kids-primary' : ''}
                    />
                    <label 
                      htmlFor="parental" 
                      className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isKidsMode ? 'text-kids-foreground text-base' : ''}`}
                    >
                      I am under 13 years old (requires parental authorization)
                    </label>
                  </div>
                  
                  {showParentEmail && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="parent-email" className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Parent/Guardian Email</Label>
                      <Input id="parent-email" type="email" placeholder="parent@example.com" className={isKidsMode ? 'h-12 text-lg' : ''} />
                      <p className={`text-xs ${isKidsMode ? 'text-kids-foreground text-sm' : 'text-muted-foreground'}`}>
                        We'll send an authorization code to your parent or guardian
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className={isKidsMode ? 'h-5 w-5 data-[state=checked]:bg-kids-primary data-[state=checked]:border-kids-primary' : ''} />
                    <label 
                      htmlFor="terms" 
                      className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isKidsMode ? 'text-kids-foreground text-base' : ''}`}
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                </CardContent>
                
                <CardFooter>
                  {showParentEmail ? (
                    <Button 
                      className={`w-full ${isKidsMode ? 'kids-button text-xl py-6' : ''}`}
                    >
                      Send Code to Parent
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full ${isKidsMode ? 'kids-button text-xl py-6' : ''}`}
                      asChild
                    >
                      <Link to="/dashboard">
                        Create Account
                        <ArrowRight size={isKidsMode ? 20 : 16} className="ml-2" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;
