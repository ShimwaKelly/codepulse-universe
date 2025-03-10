
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

const SignUp = () => {
  const { isKidsMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isParentalAuth, setIsParentalAuth] = useState(false);
  const [showParentEmail, setShowParentEmail] = useState(false);

  return (
    <div className={`flex justify-center items-center min-h-[calc(100vh-16rem)] ${isKidsMode ? 'kids-background' : 'digital-rain'}`}>
      <div className="w-full max-w-md">
        <Card className={isKidsMode ? 'kids-card' : 'glass-card hover-glow'}>
          <form>
            <CardHeader>
              <CardTitle className={isKidsMode ? 'text-2xl text-kids-primary' : ''}>Create an account</CardTitle>
              <CardDescription className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>Name</Label>
                <Input id="name" placeholder="John Doe" className={isKidsMode ? 'h-12 text-lg' : ''} />
              </div>
              
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
                  I agree to the <Link to="#" className="underline">terms and conditions</Link>
                </label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
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
                Already have an account?{" "}
                <Link to="/" className={`underline ${isKidsMode ? 'text-kids-primary' : ''}`}>
                  Log in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
