
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight, Github, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const { isKidsMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="w-full max-w-md">
        <Card className={isKidsMode ? 'kids-card' : 'glass-card hover-glow'}>
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className={isKidsMode ? 'h-5 w-5 data-[state=checked]:bg-kids-primary data-[state=checked]:border-kids-primary' : ''} />
                  <label 
                    htmlFor="remember" 
                    className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isKidsMode ? 'text-kids-foreground text-base' : ''}`}
                  >
                    Remember me
                  </label>
                </div>
                <Link to="#" className={`text-sm underline ${isKidsMode ? 'text-kids-primary text-base' : ''}`}>
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className={`w-full ${isKidsMode ? 'kids-button text-xl py-6' : ''}`}
                asChild
              >
                <Link to="/dashboard">
                  Login
                  <ArrowRight size={isKidsMode ? 20 : 16} className="ml-2" />
                </Link>
              </Button>
              
              <div className="w-full flex items-center gap-2">
                <Separator className={isKidsMode ? 'bg-kids-muted' : ''} />
                <span className={`text-xs ${isKidsMode ? 'text-kids-foreground' : 'text-muted-foreground'}`}>OR</span>
                <Separator className={isKidsMode ? 'bg-kids-muted' : ''} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" className={isKidsMode ? 'text-lg py-6' : ''}>
                  <Github size={isKidsMode ? 20 : 16} className="mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className={isKidsMode ? 'text-lg py-6' : ''}>
                  <Mail size={isKidsMode ? 20 : 16} className="mr-2" />
                  Google
                </Button>
              </div>
              
              <p className={`text-sm text-center mt-4 ${isKidsMode ? 'text-kids-foreground text-base' : 'text-muted-foreground'}`}>
                Don't have an account?{" "}
                <Link to="/signup" className={`underline ${isKidsMode ? 'text-kids-primary' : ''}`}>
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
